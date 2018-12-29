import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const theme = {
    black: '#393939',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
    grey: '#3A3A3A',
    lightGrey: '#E1E1E1',
    maxWidth: '1000px',
    offWhite: '#EDEDED',
    red: '#FF0000',
};

injectGlobal`
    @font-face {
        font-family: 'radnika_next';
        font-style: normal;
        font-weight: normal;
        src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    }
    *, *:before, *:after  {
        box-sizing: inherit;
    }
    body {
        font-family: 'radnika_next';
        font-size: 1.5rem;
        line-height: 2;
        margin: 0;
        padding: 0;
    }
    a {
        text-decoration: 0;
        color: ${theme.black};
    }
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
`;

const Inner = styled.div`
    margin: 0 auto;
    max-width: ${props => props.theme.maxWidth};
    padding: 2rem;
`;

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

class Page extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta />
                    <Header />
                    <Inner>
                        {this.props.children}
                    </Inner>
                </StyledPage>
            </ThemeProvider>
        );
    }
}

export default Page;
