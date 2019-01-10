const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');

const Mutations = {
    async createItem(parent, args, ctx, info) {
        const item = await ctx.db.mutation.createItem({
            data: {
                ...args,
            },
        }, info);
        
        return item;
    },
    updateItem(parent, args, ctx, info) {
        const updates = { ...args };
        delete updates.id;
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id,
            },
        }, info);
    },
    async deleteItem(parent, args, ctx, info) {
        const where = { id: args.id };
        const item = await ctx.db.query.item({ where }, "{ id title }");
        return ctx.db.mutation.deleteItem({ where }, info);
    },
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        const password = await bcrypt.hash(args.password, 10);
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: { set: ['USER'] },
            },
        }, info);

        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        const oneYearInMs = 1000 * 60 * 60 * 24 * 365;
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: oneYearInMs,
        });

        return user;
    },
    async signin(parent, { email, password }, ctx, info) {
        const user = await ctx.db.query.user({ where: { email } });
        if(!user) {
            throw new Error(`No such user found for email ${email}`);
        }
        
        const valid = await bcrypt.compare(password, user.password);
        if(!valid) {
            throw new Error('Invalid Password!');
        }
        
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        const oneYearInMs = 1000 * 60 * 60 * 24 * 365;
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: oneYearInMs,
        });
        
        return user;
    },
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return { message: 'Goodbye!' };
    },
    async requestReset(parent, args, ctx, info) {
        const user = await ctx.db.query.user({ where: { email: args.email } });
        if(!user) {
            throw new Error(`No such user found for email ${args.email}`);
        }

        const randomBytesPromisified = promisify(randomBytes);
        const resetToken = (await randomBytesPromisified(29)).toString('hex');
        const oneHour = 3600000;
        const resetTokenExpiry = Date.now() + oneHour;
        const res = ctx.db.mutation.updateUser({
            where: { email: args.email },
            data: { resetToken, resetTokenExpiry },
        });

        await transport.sendMail({
            from: 'sick-fits@example.com',
            to: user.email,
            subject: 'Your Password Reset Token',
            html: makeANiceEmail(`Your Password Reset Token is here!\n\n<a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`),
        });

        return { message: 'Thanks!' };
    },
    async resetPassword(parent, args, ctx, info) {
        if(args.password !== args.confirmPassword) {
            throw new Error("Yo Passwords don't match");
        }

        const oneHour = 3600000;
        const [user] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - oneHour,
            },
        });
        if(!user) {
            throw new Error('This token is either invalid or expired!');
        }

        const password = await bcrypt.hash(args.password, 10);
        const updatedUser = await ctx.db.mutation.updateUser({
            where: { email: user.email },
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
        const oneYearInMs = 1000 * 60 * 60 * 24 * 365;
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: oneYearInMs,
        });

        return updatedUser;
    },
};

module.exports = Mutations;
