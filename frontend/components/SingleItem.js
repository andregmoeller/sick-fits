import React, { Component } from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            largeImage
        }
    }
`;

const SingleItemStyles = styled.div`
    box-shadow: ${props => props.theme.bs};
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    max-width: 1200px;
    margin: 2rem auto;
    min-height: 800px;
    img {
        height: 100%;
        object-fit: contain;
        width: 100%;
    }
    .details {
        margin: 3rem;
        font-size: 2rem;
    }
`;

class SingleItem extends Component {
    render() {
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{
                id: this.props.id,
            }}>
                {({error, loading, data}) => {
                    if(error) return <Error error={error} />;
                    if(loading) return <p>Loading…</p>;
                    if(!data.item) return <p>No item found for ID {this.props.id}</p>;
                    const item = data.item;
                    return (
                        <SingleItemStyles>
                            <Head>
                                <title>Sick Fits | {item.title}</title>
                            </Head>
                            <img src={item.largeImage} alt={item.title} />
                            <div className="details">
                                <h2>Viewing {item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        </SingleItemStyles>
                    );
                }}
            </Query>
        );
    }
}

export default SingleItem;
export { SINGLE_ITEM_QUERY };
