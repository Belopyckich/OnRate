import {Upload as AntdUpload, UploadProps} from 'antd';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {showImageEditorDialog} from '../dialogs/imageEditorDialog/actions';
import {UploadFileCallbackProps} from '../dialogs/imageEditorDialog/interfaces';
import {
    MessageType,
    showNotification,
} from '../showNotification/show-notification';
import {
    DEFAULT_FILE_MAX_SIZE,
    DEFAULT_IMAGE_FILE_TYPES_FOR_UPLOADER,
} from './constants';
import {
    beforeUploadImageCheckings,
    checkFileFormat,
    checkFileSize,
} from './helpers';

export interface UserPhotoUploadProps
    extends Omit<
        UploadProps,
        'multiple' | 'showUploadList' | 'openFileDialogOnClick' | 'beforeUpload'
    > {
    uploadFileCallback: (props: UploadFileCallbackProps) => void;
}

export const UserPhotoUpload = ({
    uploadFileCallback,
    ...props
}: UserPhotoUploadProps) => {
    const dispatch = useDispatch();

    const uploadProps: UploadProps = {
        ...props,
        // обязательные ограничения для загрузки одной фотографии
        multiple: false,
        showUploadList: false,
        openFileDialogOnClick: true,
        // ограничения из пропсов
        beforeUpload: (file: File) => {
            if (checkFileFormat(file, DEFAULT_IMAGE_FILE_TYPES_FOR_UPLOADER)) {
                return false;
            }

            if (checkFileSize(file, DEFAULT_FILE_MAX_SIZE)) {
                return false;
            }

            return new Promise((resolve, reject) => {
                try {
                    const img = new Image();

                    const imgSrc = URL.createObjectURL(
                        new Blob([file], {type: file.type}),
                    );

                    img.src = imgSrc;

                    img.onload = () => {
                        resolve();
                        const data = beforeUploadImageCheckings(file, img);

                        dispatch(
                            showImageEditorDialog({
                                ...data,
                                uploadFileCallback,
                            }),
                        );
                    };

                    img.onerror = () => {
                        showNotification(
                            'Произошла ошибка при загрузке фотографии. Попробуйте выбрать другую фотографию',
                            MessageType.Error,
                        );
                    };
                } catch (e) {
                    reject(e);
                }
            });
        },
    };

    return <AntdUpload {...uploadProps} />;
};
