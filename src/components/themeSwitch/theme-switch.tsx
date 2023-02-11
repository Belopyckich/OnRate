import {ThemeContext} from '@src/themes/theme-provider';
import {Theme} from '@src/typings';
import {Switch} from 'antd';
import React, {useContext} from 'react';

export const ThemeSwitch = () => {
    const {theme, switchTheme} = useContext(ThemeContext);

    const changeTheme = (checked: boolean) =>
        switchTheme(checked ? Theme.Dark : Theme.Light);

    return <Switch onClick={changeTheme} checked={theme === Theme.Dark} />;
};
