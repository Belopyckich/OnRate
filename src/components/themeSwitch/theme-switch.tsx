import {ThemeContext} from '@src/themes/theme-provider';
import {Theme} from '@src/typings';
import {Switch} from 'antd';
import React, {useContext} from 'react';

import styles from './styles.module.scss';

export const ThemeSwitch = () => {
    const {theme, switchTheme} = useContext(ThemeContext);

    const changeTheme = (checked: boolean) =>
        switchTheme(checked ? Theme.Dark : Theme.Light);

    return (
        <div className={styles.themeSwitch}>
            <span>Светлая тема</span>
            <Switch onClick={changeTheme} checked={theme === Theme.Dark} />
            <span>Темная тема</span>
        </div>
    );
};
