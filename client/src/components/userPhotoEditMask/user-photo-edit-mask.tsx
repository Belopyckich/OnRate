import UploadIcon from '@src/assets/photo-upload-icon.component.svg';
import PhotoShowIcon from '@src/assets/show-photo-eye-icon.component.svg';
import DeleteIcon from '@src/assets/trash.component.svg';
import {Nullable} from '@src/typings';
import {Tooltip} from 'antd';
import {UploadType} from 'antd/es/upload/interface';
import cn from 'classnames';
import React, {CSSProperties, useState} from 'react';

import {AvatarPreview} from '../avatarPreview/avatar-preview';
import {Dropdown} from '../dropdown/dropdown';
import {TextOverflow} from '../textOverflow/text-overflow';
import {Upload} from '../uploader/upload';
import {
    USER_PHOTO_EDIT_MASK_DROPDOWN_TITLES,
    UserPhotoEditMaskDropdownKeys,
} from './constants';
import styles from './style.module.scss';

export interface UserPhotoEditMaskProps {
    children: React.ReactNode;
    canManipulate?: boolean;
    src?: Nullable<string>;
    deleteFile?: () => void;
    uploadFile?: () => void;
    uploadType?: UploadType;
    extraClassname?: string;
    style?: React.CSSProperties;
}

export const UserPhotoEditMask = ({
    deleteFile,
    uploadFile,
    children,
    canManipulate,
    src,
    extraClassname,
    style,
}: UserPhotoEditMaskProps) => {
    const [isAvatarPreview, setIsAvatarPreview] = useState(false);

    const hasPhoto = Boolean(src);

    const onShowAvatar = () => setIsAvatarPreview(true);

    const menu = {
        items: [
            {
                label: USER_PHOTO_EDIT_MASK_DROPDOWN_TITLES[
                    UserPhotoEditMaskDropdownKeys.ShowPhoto
                ],
                key: UserPhotoEditMaskDropdownKeys.ShowPhoto,
                icon: <PhotoShowIcon />,
            },
            {
                label: (
                    <Upload>
                        {
                            USER_PHOTO_EDIT_MASK_DROPDOWN_TITLES[
                                UserPhotoEditMaskDropdownKeys.ChangePhoto
                            ]
                        }
                    </Upload>
                ),
                key: UserPhotoEditMaskDropdownKeys.ChangePhoto,
                icon: <UploadIcon />,
            },
            {
                label: USER_PHOTO_EDIT_MASK_DROPDOWN_TITLES[
                    UserPhotoEditMaskDropdownKeys.DeletePhoto
                ],
                key: UserPhotoEditMaskDropdownKeys.DeletePhoto,
                icon: <DeleteIcon />,
                danger: true,
            },
        ],
    };

    const photo = (
        <div
            className={cn(styles.userPhotoEditMaskWrapper, extraClassname)}
            style={style}
        >
            {canManipulate && (
                <div className={styles.userPhotoEditMask}>
                    {hasPhoto ? (
                        <PhotoShowIcon onClick={onShowAvatar} />
                    ) : (
                        <Upload>
                            <UploadIcon onClick={uploadFile} />
                        </Upload>
                    )}
                </div>
            )}

            {children}
        </div>
    );

    const photoWithDropdown = true ? (
        <>
            <Dropdown menu={menu} placement="bottom">
                {photo}
            </Dropdown>

            {isAvatarPreview && (
                <AvatarPreview
                    src={src}
                    onClose={() => setIsAvatarPreview(false)}
                />
            )}
        </>
    ) : (
        <Tooltip
            placement="bottom"
            title="Загрузите фото в формате PNG, JPG, JPEG"
        >
            {photo}
        </Tooltip>
    );

    return canManipulate ? photoWithDropdown : photo;
};
