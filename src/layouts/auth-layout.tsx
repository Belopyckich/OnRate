import {Layout} from 'antd';
import React from 'react';

const {Content} = Layout;

interface AuthProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthProps) => (
    <Layout style={{minHeight: '100vh'}}>
        <div>ХЕДЕР АУТЕНФИКАЦИИ</div>

        <Layout>
            <Content>{children}</Content>
        </Layout>
    </Layout>
);

export default AuthLayout;
