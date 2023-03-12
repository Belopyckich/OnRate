import {Spin} from 'antd';
import React from 'react';

import styles from './styles.module.scss';

export interface PreloaderProps {
    text: string;
    isHidden?: boolean;
}

export const Preloader = ({text = 'Загрузка', isHidden}: PreloaderProps) => (
    <div className={styles.preloaderContainer}>
        <Spin size="large" tip={text} spinning={!isHidden} />
    </div>
);
