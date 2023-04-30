import {
    LOCAL_STORAGE_KEYS,
    setLocalStorageValue,
} from '@src/helpers/localStorageManagement';
import {Theme} from '@src/typings';
import React, {useEffect} from 'react';
import {createContext, useState} from 'react';
import {useMediaPredicate} from 'react-media-hook';

import {ThemeProviderProps, ThemeSwitcherContextProps} from './interfaces';

export const ThemeContext = createContext<ThemeSwitcherContextProps>(
    {} as ThemeSwitcherContextProps,
);

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState(Theme.Dark);
    const [isChangedThemeBySystem, setIsChangedThemeBySystem] = useState(false);

    const preferredTheme = useMediaPredicate('(prefers-color-scheme: dark)')
        ? Theme.Dark
        : Theme.Light;

    useEffect(() => document.documentElement.classList.add(theme), []);

    const switchTheme = (currentTheme: Theme) => {
        if (theme !== currentTheme) {
            document.documentElement.classList.add('theme-transition');

            setTimeout(() => {
                document.documentElement.classList.remove('theme-transition');
            }, 1000);

            document.documentElement.classList.remove(theme);

            document.documentElement.classList.add(currentTheme);

            setTheme(currentTheme);
        }
    };

    const changeThemeBySystem = (value: boolean) => {
        setLocalStorageValue(LOCAL_STORAGE_KEYS.isChangedThemeBySystem, value);
        setIsChangedThemeBySystem(value);
        switchTheme(preferredTheme);
    };

    return (
        <ThemeContext.Provider
            value={{
                theme,
                switchTheme,
                isChangedThemeBySystem,
                setIsChangedThemeBySystem: changeThemeBySystem,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
