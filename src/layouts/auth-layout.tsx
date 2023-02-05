import {Layout} from 'antd';
import {Footer, Header} from 'antd/es/layout/layout';
import React from 'react';

const {Content} = Layout;

interface AuthProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthProps) => (
    <Layout style={{height: '100%'}}>
        <Header style={{padding: 0}} />

        <Content
            style={{
                backgroundColor: '#2a2a2a',
                height: 'calc(100vh - 64px)',
                overflow: 'auto',
            }}
        >
            {children}
        </Content>
    </Layout>
);

export default AuthLayout;
