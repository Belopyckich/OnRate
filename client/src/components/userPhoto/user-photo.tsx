import Icon from '@ant-design/icons';
import {User} from '@src/redux/app/interfaces';
import {Nullable} from '@src/typings';
import React, {CSSProperties} from 'react';

import {USER_PHOTO_DEFAULT_STYLES} from './constants';
import styles from './styles.module.scss';

export interface UserPhotoProps {
    user: Nullable<Partial<Pick<User, 'name' | 'picture'>>>;
    style?: CSSProperties;
}

export const UserPhoto = ({
    user,
    style = USER_PHOTO_DEFAULT_STYLES,
}: UserPhotoProps) => {
    if (user) {
        const {name = 'Нет фото', picture} = user;

        return (
            <div className={styles.userPhoto} style={style}>
                {picture?.thumbnail ? (
                    <img loading="lazy" src={picture.thumbnail} alt="" />
                ) : (
                    <div className={styles.userPhotoEmptyWrapper}>
                        <div className={styles.userPhotoEmpty}>{name[0]}</div>
                    </div>
                )}
            </div>
        );
    }

    return null;
};
