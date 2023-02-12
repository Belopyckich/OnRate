import {MainHeader} from '@src/components/header/header';
import {Sidebar} from '@src/components/sidebar/sidebar';
import {Layout} from 'antd';
import React from 'react';

import styles from './styles.module.scss';

const {Content} = Layout;

interface AuthProps {
    children: React.ReactNode;
}

const MainLayout = ({children}: AuthProps) => (
    <Layout style={{height: '100vh', overflow: 'hidden'}}>
        <Sidebar />

        <Layout>
            <MainHeader />

            <Content>{children}</Content>
        </Layout>
    </Layout>
);

export default MainLayout;
