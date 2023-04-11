import UploadIcon from '@src/assets/photo-upload-icon.component.svg';
import PhotoShowIcon from '@src/assets/show-photo-eye-icon.component.svg';
import DeleteIcon from '@src/assets/trash.component.svg';
import {Nullable} from '@src/typings';
import {Dropdown, Tooltip, Upload} from 'antd';
import {UploadType} from 'antd/es/upload/interface';
import cn from 'classnames';
import React, {CSSProperties, useState} from 'react';

import {AvatarPreview} from '../avatarPreview/avatar-preview';
import {UploadFileCallbackProps} from '../dialogs/imageEditorDialog/interfaces';
import {UserPhotoUpload} from '../uploader/upload';
import {
    USER_PHOTO_EDIT_MASK_DROPDOWN_TITLES,
    UserPhotoEditMaskDropdownKeys,
} from './constants';
import styles from './style.module.scss';

export interface UserPhotoUploadEditMaskCanManipulateProps {
    children: React.ReactNode;
    canManipulate: true;
    src?: Nullable<string>;
    deleteFile: () => void;
    uploadFile: (props: UploadFileCallbackProps) => void;
    uploadType?: UploadType;
    extraClassname?: string;
    style?: React.CSSProperties;
}

export interface UserPhotoUploadEditMaskCantManipulateProps {
    children: React.ReactNode;
    canManipulate?: undefined;
    src?: Nullable<string>;
    deleteFile?: undefined;
    uploadFile?: undefined;
    uploadType?: UploadType;
    extraClassname?: string;
    style?: React.CSSProperties;
}

export type UserPhotoEditMaskProps =
    | UserPhotoUploadEditMaskCanManipulateProps
    | UserPhotoUploadEditMaskCantManipulateProps;

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

    const menu = canManipulate && {
        items: [
            {
                label: USER_PHOTO_EDIT_MASK_DROPDOWN_TITLES[
                    UserPhotoEditMaskDropdownKeys.ShowPhoto
                ],
                key: UserPhotoEditMaskDropdownKeys.ShowPhoto,
                icon: <PhotoShowIcon />,
                onClick: onShowAvatar,
            },
            {
                label: (
                    <UserPhotoUpload uploadFileCallback={uploadFile}>
                        {
                            USER_PHOTO_EDIT_MASK_DROPDOWN_TITLES[
                                UserPhotoEditMaskDropdownKeys.ChangePhoto
                            ]
                        }
                    </UserPhotoUpload>
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
                onClick: deleteFile,
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
                        <UserPhotoUpload uploadFileCallback={uploadFile}>
                            <UploadIcon onClick={uploadFile} />
                        </UserPhotoUpload>
                    )}
                </div>
            )}

            {children}
        </div>
    );

    const photoWithDropdown = hasPhoto ? (
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
