import {CloseOutlined} from '@ant-design/icons';
import useEscHandler from '@hooks/use-esc-handler';
import {Nullable} from '@src/typings';
import cn from 'classnames';
import React from 'react';

import styles from './style.module.scss';

export interface AvatarPreviewProps {
    onClose: () => void;
    src?: Nullable<string>;
    extraIconClassName?: string;
    children?: JSX.Element;
}

export const AvatarPreview = ({
    onClose,
    src,
    extraIconClassName,
    children,
}: AvatarPreviewProps) => {
    useEscHandler(onClose);

    return (
        <div className={styles.avatarPreview}>
            <div className={styles.avatarPreviewMask} onClick={onClose} />

            <div className={styles.avatarPreviewContainer}>
                <div
                    onClick={onClose}
                    className={styles.avatarPreviewButtonClose}
                >
                    <CloseOutlined />
                </div>

                {src && (
                    <div
                        style={{backgroundImage: `url(${src})`}}
                        className={cn(
                            styles.avatarPreviewImg,
                            extraIconClassName,
                        )}
                    />
                )}

                <img src={src || 'NO_PHOTO_TEXT'} alt="" />

                {children}
            </div>
        </div>
    );
};
