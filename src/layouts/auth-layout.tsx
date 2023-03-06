import {Layout} from 'antd';
import {Footer, Header} from 'antd/es/layout/layout';
import React from 'react';

const {Content} = Layout;

interface AuthProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthProps) => (
    <Layout>
        <Header style={{padding: 0}} />

        <Content>{children}</Content>
    </Layout>
);

export default AuthLayout;
