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
    <Layout className={styles.mainLayout}>
        <Sidebar />

        <Layout>
            <MainHeader />

            <Content className={styles.mainLayoutContent}>{children}</Content>
        </Layout>
    </Layout>
);

export default MainLayout;
