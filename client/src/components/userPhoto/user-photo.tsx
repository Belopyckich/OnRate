import Icon from '@ant-design/icons';
import {User} from '@src/redux/app/interfaces';
import {Nullable} from '@src/typings';
import React, {CSSProperties} from 'react';

import {USER_PHOTO_DEFAULT_STYLES} from './constants';
import styles from './styles.module.scss';

export interface UserPhotoProps {
    username?: string;
    src?: string;
    style?: CSSProperties;
}

export const UserPhoto = ({
    username = 'Нет фото',
    src,
    style = USER_PHOTO_DEFAULT_STYLES,
}: UserPhotoProps) => {
    return (
        <div className={styles.userPhoto} style={style}>
            {src ? (
                <img loading="lazy" src={src} alt="" />
            ) : (
                <div className={styles.userPhotoEmptyWrapper}>
                    <div className={styles.userPhotoEmpty}>{username[0]}</div>
                </div>
            )}
        </div>
    );
};
