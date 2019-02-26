import formatMoney from '../lib/formatMoney';

describe('formatMoney Function', () => {
    it('works with fractional daollars', () => {
        expect(formatMoney(1)).toEqual('$0.01');
        expect(formatMoney(10)).toEqual('$0.10');
    });

    it('leaves cents off for whole dollars', () => {
        expect(formatMoney(5000)).toEqual('$50'); 
        expect(formatMoney(500000)).toEqual('$5,000'); 
    });

    it('works with whole and fractional dollars', () => {
        expect(formatMoney(110)).toEqual('$1.10');
    });
});
