import {ThemeContext} from '@src/themes/theme-provider';
import {Theme} from '@src/typings';
import {Switch} from 'antd';
import cn from 'classnames';
import React, {useContext} from 'react';

import styles from './styles.module.scss';

export interface ThemeSwitchProps {
    isSidebarOpen: boolean;
}

export const ThemeSwitch = ({isSidebarOpen}: ThemeSwitchProps) => {
    const {theme, switchTheme} = useContext(ThemeContext);

    const changeTheme = (checked: boolean) =>
        switchTheme(checked ? Theme.Dark : Theme.Light);

    <Switch onClick={changeTheme} checked={theme === Theme.Dark} />;

    return (
        <div
            className={cn(styles.themeSwitch, {
                [styles.themeSwitchFolded]: !isSidebarOpen,
            })}
        >
            {isSidebarOpen && <span>Светлая тема</span>}

            <Switch onClick={changeTheme} checked={theme === Theme.Dark} />

            {isSidebarOpen && <span>Темная тема</span>}
        </div>
    );
};
