import {messages} from '@constants/messages';
import EmptyDark from '@src/assets/empty-dark.component.svg';
import Empty from '@src/assets/empty.component.svg';
import {ThemeContext} from '@src/themes/theme-provider';
import {Theme} from '@src/typings';
import cn from 'classnames';
import React, {ReactNode, useContext} from 'react';

import styles from './styles.module.scss';

interface EmptyBlockProps {
    description?: string | ReactNode;
    extraClassName?: string;
    extraTextClassName?: string;
    // для отображения кастомных иконок, прокидывать сразу для двух тем
    customLightThemeIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    customDarkThemeIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    extraClassNameIcon?: string;
}

export const EmptyBlock = ({
    description = messages.noData,
    extraClassName,
    extraTextClassName,
    customLightThemeIcon,
    customDarkThemeIcon,
    extraClassNameIcon,
}: EmptyBlockProps) => {
    const theme = useContext(ThemeContext).theme;

    const isLightTheme = theme === Theme.Light;

    let CurrentIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;

    if (customLightThemeIcon && customDarkThemeIcon) {
        CurrentIcon = isLightTheme ? customLightThemeIcon : customDarkThemeIcon;
    } else {
        CurrentIcon = isLightTheme ? Empty : EmptyDark;
    }

    return (
        <div className={cn(styles.emptyBlock, extraClassName)}>
            <CurrentIcon className={extraClassNameIcon} />

            {description && (
                <div className={cn(styles.emptyBlockText, extraTextClassName)}>
                    {description}
                </div>
            )}
        </div>
    );
};
