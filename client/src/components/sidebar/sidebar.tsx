import Icon from '@ant-design/icons';
import {APP_ROUTES} from '@src/constants';
import {checkIsMobile} from '@src/helpers/check-is-mobile';
import {Menu} from 'antd';
import Sider from 'antd/es/layout/Sider';
import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

import KanbanIcon from '../../assets/kanban.component.svg';
import LogoIcon from '../../assets/logo.component.svg';
import SettingsIcon from '../../assets/settings.component.svg';
import UserSettingsIcon from '../../assets/user-settings.component.svg';
import {ThemeSwitch} from '../themeSwitch/theme-switch';
import {SIDEBAR_TITLE} from './constants';
import styles from './styles.module.scss';

export interface SidebarProps {
    isSidebarOpen: boolean;
}

export const Sidebar = ({isSidebarOpen}: SidebarProps) => {
    const isMobileSidebar = checkIsMobile(['ss', 'xs']);

    const {pathname} = useLocation();

    const history = useNavigate();

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
                    defaultSelectedKeys={[pathname]}
                    items={[
                        {
                            key: APP_ROUTES.KANBAN,
                            icon: <KanbanIcon />,
                            label: SIDEBAR_TITLE[APP_ROUTES.KANBAN],
                        },
                        {
                            key: APP_ROUTES.USER_SETTINGS,
                            icon: <UserSettingsIcon />,
                            label: SIDEBAR_TITLE[APP_ROUTES.USER_SETTINGS],
                        },
                        {
                            key: APP_ROUTES.ENVIRONMENT_SETTINGS,
                            icon: <SettingsIcon />,
                            label: SIDEBAR_TITLE[
                                APP_ROUTES.ENVIRONMENT_SETTINGS
                            ],
                        },
                    ]}
                    onSelect={({key}) => history(key)}
                />

                <ThemeSwitch isSidebarOpen={isSidebarOpen} />
            </div>
        </Sider>
    );
};
