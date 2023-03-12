import Icon from '@ant-design/icons';
import {TextOverflow} from '@components/textOverflow/text-overflow';
import PlusIcon from '@src/assets/plus.component.svg';
import {checkIsMobile} from '@src/helpers/check-is-mobile';
import cn from 'classnames';
import React from 'react';

import styles from './style.module.scss';

interface ButtonWithIconProps {
    title?: string;
    component?: React.ComponentType<any | React.SVGProps<SVGSVGElement>>;
    disabled?: boolean;
    wrapperClassName?: string;
    titleBlockClassName?: string;
    onClick?: () => void;
}

export const ButtonWithIcon = ({
    title,
    component,
    disabled,
    wrapperClassName,
    titleBlockClassName,
    onClick,
}: ButtonWithIconProps) => {
    const isMobile = checkIsMobile(['ss', 'xs', 'sm']);

    const iconComponent = component ?? PlusIcon;

    return (
        <div
            onClick={onClick}
            className={cn(styles.buttonWithIcon, wrapperClassName, {
                [styles.buttonWithIconDisabled]: disabled,
            })}
        >
            <div className={styles.buttonWithIconIcon}>
                <Icon component={iconComponent} />
            </div>

            {title && !isMobile && (
                <TextOverflow
                    text={title}
                    extraClassName={cn(
                        styles.buttonWithIconTitle,
                        titleBlockClassName,
                    )}
                />
            )}
        </div>
    );
};
