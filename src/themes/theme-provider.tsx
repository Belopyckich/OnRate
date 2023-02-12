import {Theme} from '@src/typings';
import React, {useEffect} from 'react';
import {createContext, useState} from 'react';

import {ThemeProviderProps, ThemeSwitcherContextProps} from './interfaces';

export const ThemeContext = createContext<ThemeSwitcherContextProps>(
    {} as ThemeSwitcherContextProps,
);

export const ThemeProvider = ({children}: ThemeProviderProps) => {
    const [theme, setTheme] = useState(Theme.Dark);

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

    return (
        <ThemeContext.Provider value={{theme, switchTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};
