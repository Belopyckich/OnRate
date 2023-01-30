import {Layout} from 'antd';
import {Footer, Header} from 'antd/es/layout/layout';
import React from 'react';

const {Content} = Layout;

interface AuthProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthProps) => (
    <Layout style={{minHeight: '100vh'}}>
        <Header style={{padding: 0}} />

        <Layout>
            <Content style={{backgroundColor: '#2a2a2a'}}>{children}</Content>
        </Layout>

        <Footer>Footer</Footer>
    </Layout>
);

export default AuthLayout;
