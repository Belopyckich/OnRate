import {Layout} from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';

const {Content} = Layout;

interface AuthProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthProps) => (
    <Layout style={{minHeight: '100vh'}}>
        <div>ОСНОВНОЙ ХЕДЕР</div>
        <Layout>
            <Sider>Sider</Sider>
            <Content>{children}</Content>
        </Layout>
    </Layout>
);

export default AuthLayout;
