import Icon from '@ant-design/icons';
import {checkIsMobile} from '@src/helpers/check-is-mobile';
import {selectIsSidebarOpen} from '@src/redux/app/selectors';
import {Menu} from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import {useSelector} from 'react-redux';

import LogoIcon from '../../assets/logo.component.svg';
import {ThemeSwitch} from '../themeSwitch/theme-switch';
import styles from './styles.module.scss';

export const Sidebar = () => {
    const isSidebarOpen = useSelector(selectIsSidebarOpen);

    const isMobileSidebar = checkIsMobile(['ss', 'xs']);

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={!isSidebarOpen}
            className={styles.sidebar}
            width={isMobileSidebar ? 'calc(100vw - 50px)' : '220px'}
            collapsedWidth={isMobileSidebar ? 0 : undefined}
        >
            <Icon component={LogoIcon} className={styles.sidebarLogo} />

            <div className={styles.sidebarContent}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <LogoIcon />,
                            label: 'nav 1',
                        },
                        {
                            key: '2',
                            icon: <LogoIcon />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <LogoIcon />,
                            label: 'nav 3',
                        },
                        {
                            key: '4',
                            icon: <LogoIcon />,
                            label: 'nav 1',
                        },
                        {
                            key: '5',
                            icon: <LogoIcon />,
                            label: 'nav 2',
                        },
                        {
                            key: '6',
                            icon: <LogoIcon />,
                            label: 'nav 3',
                        },
                        {
                            key: '7',
                            icon: <LogoIcon />,
                            label: 'nav 1',
                        },
                        {
                            key: '8',
                            icon: <LogoIcon />,
                            label: 'nav 2',
                        },
                        {
                            key: '9',
                            icon: <LogoIcon />,
                            label: 'nav 3',
                        },
                    ]}
                />

                <ThemeSwitch isSidebarOpen={isSidebarOpen} />
            </div>
        </Sider>
    );
};
