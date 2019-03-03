import React from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_FROM_CART_MUTATION = gql`
    mutation removeFromCart($id: ID!) {
        removeFromCart(id: $id) {
            id
        }
    }
`;

const BigButton = styled.button`
    background: none;
    border: 0;
    font-size: 3rem;
    &:hover {
        color: ${props => props.theme.red};
        cursor: pointer;
    }
`;

class RemvoeFromCart extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
    };

    // this gets called as soon as we get a response back
    // from the server after a mutation has been performed
    update = (cache, payload) => {
        const data = cache.readQuery({ query: CURRENT_USER_QUERY });
        const cartItemId = payload.data.removeFromCart.id;
        data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
        cache.writeQuery({ query: CURRENT_USER_QUERY, data });
    };

    render() {
        return (
            <Mutation 
                mutation={REMOVE_FROM_CART_MUTATION}
                variables={{id: this.props.id}}
                update={this.update}
                optimisticResponse={{
                    __typename: 'Mutation',
                    removeFromCart: {
                        __typename: 'CartItem',
                        id: this.props.id,
                    },
                }}
            >
                {(removeFromCart, { loading, error }) =>
                    <BigButton 
                        disabled={loading}
                        title="Delete Item"
                        onClick={() => {
                            removeFromCart().catch(err => alert(err.message));
                        }}
                    >
                        &times;
                    </BigButton>
                }
            </Mutation>
        );
    }
}

export default RemvoeFromCart;
export { REMOVE_FROM_CART_MUTATION};
