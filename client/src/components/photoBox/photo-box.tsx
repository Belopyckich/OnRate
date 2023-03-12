import Icon from '@ant-design/icons';
import React from 'react';

import styles from './styles.module.scss';

export interface PhotoBoxProps {
    photo?: string;
}

export const PhotoBox = ({photo}: PhotoBoxProps) => (
    <div className={styles.photoBox}>
        {photo ? <img loading="lazy" src={photo} alt="" /> : <Icon />}
    </div>
);
