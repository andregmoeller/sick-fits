import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

Router.onRouteChangeStart = () => {
    NProgress.start();
};

Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.done();
};

const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    position: relative;
    transform: skew(-7deg);
    z-index: 2;
    a {
        background: ${props => props.theme.red};
        color: white;
        padding: 0.5rem 1rem;
        text-decoration: none;
        text-transform: uppercase;
    }
    @media (max-width: 1300px) {
        margin: 0;
        text-align: center;
    }
`;

const StyledHeader = styled.header`
    .bar {
        align-items: stretch;
        border-bottom: 10px solid ${props => props.theme.black};
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        @media (max-width: 1300px) {
            grid-template-columns: 1fr;
            justify-content: center;
        }
    }
    .sub-bar {
        border-bottom: 1px solid ${props => props.theme.lightGrey};
        display: grid;
        grid-template-columns: 1fr auto;
    }
`;

const Header = () => (
    <StyledHeader>
        <div className="bar">
            <Logo>
                <Link href="/">
                    <a>Sick Fits</a>
                </Link>
            </Logo>
            <Nav />
        </div>
        <div className="sub-bar">
            <Search />
        </div>
        <Cart />
    </StyledHeader>
);

export default Header;
