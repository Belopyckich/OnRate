import {Theme} from '@src/typings';

export interface ThemeProviderProps {
    children: React.ReactNode;
}

export interface ThemeSwitcherContextProps {
    theme: Theme;
    switchTheme: (theme: Theme) => void;
    isChangedThemeBySystem: boolean;
    setIsChangedThemeBySystem: (value: boolean) => void;
}
