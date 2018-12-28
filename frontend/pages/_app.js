import App, { container } from 'next/app';
import Page from '../components/Page';

class SickFitsApp extends App {
    render() {
        const { Component } = this.props;

        return (
            <container>
                <Page>
                    <Component />
                </Page>
            </container>
        )
    }
}

export default SickFitsApp;
