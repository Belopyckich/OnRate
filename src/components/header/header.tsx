import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import {checkIsMobile} from '@src/helpers/check-is-mobile';
import {setIsSidebarOpen} from '@src/redux/app/actions';
import {selectIsSidebarOpen} from '@src/redux/app/selectors';
import {Header} from 'antd/es/layout/layout';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles.module.scss';

export const MainHeader = () => {
    const dispatch = useDispatch();

    const isSidebarOpen = useSelector(selectIsSidebarOpen);

    const isMobileSidebar = checkIsMobile(['ss']);

    return (
        <Header
            style={{
                paddingInline:
                    isSidebarOpen && isMobileSidebar ? '0px' : '24px',
            }}
            className={styles.header}
        >
            {isSidebarOpen ? (
                <MenuFoldOutlined
                    className={styles.headerControlSidebarIcon}
                    onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
                />
            ) : (
                <MenuUnfoldOutlined
                    className={styles.headerControlSidebarIcon}
                    onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
                />
            )}
            HEADER
        </Header>
    );
};
