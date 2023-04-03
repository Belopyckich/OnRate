import {Dropdown as AntdDropdown, DropdownProps} from 'antd';
import cn from 'classnames';
import React from 'react';

import styles from './styles.module.scss';

export const Dropdown = (props: DropdownProps) => (
    <AntdDropdown
        {...props}
        overlayClassName={cn(styles.dropdown, props.overlayClassName)}
    />
);
