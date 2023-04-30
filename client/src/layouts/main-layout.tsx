import {MainHeader} from '@src/components/header/header';
import {Sidebar} from '@src/components/sidebar/sidebar';
import {
    selectCurrentUserBackground,
    selectIsSidebarOpen,
} from '@src/redux/app/selectors';
import {Layout} from 'antd';
import cn from 'classnames';
import React from 'react';
import {useSelector} from 'react-redux';

import styles from './styles.module.scss';

const {Content} = Layout;

interface AuthProps {
    children: React.ReactNode;
}

const MainLayout = ({children}: AuthProps) => {
    const isSidebarOpen = useSelector(selectIsSidebarOpen);
    const userBackground = useSelector(selectCurrentUserBackground);
    console.log('🚀 ~ userBackground:', userBackground);

    return (
        <Layout className={styles.mainLayout}>
            <Sidebar isSidebarOpen={isSidebarOpen} />

            <Layout>
                <MainHeader />

                <Content
                    style={{
                        backgroundImage: `url(${userBackground})`,
                    }}
                    className={cn(styles.mainLayoutContent, {
                        [styles.mainLayoutContentCollapsed]: isSidebarOpen,
                    })}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
