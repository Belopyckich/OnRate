import {ThemeContext} from '@src/themes/theme-provider';
import {Theme} from '@src/typings';
import {Layout} from 'antd';
import {Footer, Header} from 'antd/es/layout/layout';
import cn from 'classnames';
import React, {useContext} from 'react';

import styles from './styles.module.scss';

const {Content} = Layout;

interface AuthProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthProps) => {
    const {theme} = useContext(ThemeContext);

    return (
        <Layout
            className={cn(styles.authLayout, {
                [styles.authLayoutDark]: theme === Theme.Dark,
            })}
        >
            <img />
            <Content>{children}</Content>
        </Layout>
    );
};

export default AuthLayout;
