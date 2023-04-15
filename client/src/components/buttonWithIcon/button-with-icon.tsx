import Icon from '@ant-design/icons';
import {TextOverflow} from '@components/textOverflow/text-overflow';
import PlusIcon from '@src/assets/plus.component.svg';
import {checkIsMobile} from '@src/helpers/check-is-mobile';
import {Button} from 'antd';
import cn from 'classnames';
import React from 'react';

import styles from './style.module.scss';

export enum ButtonWithIconType {
    Default = 'Default',
    WithoutStyles = 'WithoutStyles',
}

interface ButtonWithIconProps {
    title?: string;
    type?: ButtonWithIconType;
    component?: React.ComponentType<any | React.SVGProps<SVGSVGElement>>;
    disabled?: boolean;
    wrapperClassName?: string;
    titleBlockClassName?: string;
    onClick?: () => void;
}

export const ButtonWithIcon = ({
    title,
    type = ButtonWithIconType.Default,
    component,
    disabled,
    wrapperClassName,
    titleBlockClassName,
    onClick,
}: ButtonWithIconProps) => {
    const isMobile = checkIsMobile(['ss', 'xs', 'sm']);

    const iconComponent = component ?? PlusIcon;

    switch (type) {
        case ButtonWithIconType.WithoutStyles:
            return (
                <div
                    onClick={onClick}
                    className={cn(
                        styles.buttonWithIconWithoutStyles,
                        wrapperClassName,
                    )}
                >
                    <Icon
                        component={PlusIcon}
                        className={styles.buttonWithIconWithoutStylesIcon}
                    />

                    <Button className={titleBlockClassName} type="link">
                        {title}
                    </Button>
                </div>
            );

        default:
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
    }
};
