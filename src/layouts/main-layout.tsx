import {ThemeSwitch} from '@src/components/themeSwitch/theme-switch';
import {Layout} from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';

import styles from './styles.module.scss';

const {Content} = Layout;

interface AuthProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthProps) => (
    <Layout style={{minHeight: '100vh'}}>
        <div className={styles.mainPage}>ОСНОВНОЙ ХЕДЕР</div>
        <Layout>
            <Sider>
                <span>Sider</span>
                <ThemeSwitch />
            </Sider>
            <Content>{children}</Content>
        </Layout>
    </Layout>
);

export default AuthLayout;
