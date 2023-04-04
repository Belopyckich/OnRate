import {Upload as AntdUpload, UploadProps} from 'antd';
import React, {useState} from 'react';

import {
    MessageType,
    showNotification,
} from '../showNotification/show-notification';
import {
    DEFAULT_FILE_MAX_SIZE,
    DEFAULT_IMAGE_FILE_TYPES_FOR_UPLOADER,
    DEFAULT_IMAGE_MIN_RESOLUTION,
} from './constants';
import {
    checkFileFormat,
    checkFileSize,
    drawImageToMinResolution,
    setLoadedFileWithoutExifParams,
} from './helpers';

export const Upload = (props: UploadProps) => {
    const [imageNaturalSideState, setImageNaturalSideState] = useState<{
        width: number;
        height: number;
    }>();
    const [loadedImage, setLoadedImage] = useState<HTMLImageElement>();
    const [loadedFile, setLoadedFile] = useState<File>();

    const uploadProps: UploadProps = {
        ...props,
        // обязательные ограничения для загрузки одной фотографии
        multiple: false,
        showUploadList: false,
        openFileDialogOnClick: true,
        // ограничения из пропсов
        beforeUpload: (file: File) => {
            const beforeUploadImageCheckings = (img: HTMLImageElement) => {
                const loadedImageNaturalWidth = img.naturalWidth;
                const loadedImageNaturalHeight = img.naturalHeight;

                if (
                    loadedImageNaturalWidth < DEFAULT_IMAGE_MIN_RESOLUTION ||
                    loadedImageNaturalHeight < DEFAULT_IMAGE_MIN_RESOLUTION
                ) {
                    setImageNaturalSideState({
                        width: loadedImageNaturalWidth,
                        height: loadedImageNaturalHeight,
                    });

                    const drawnToMinResolutionImage = drawImageToMinResolution({
                        image: img,
                        minWidth: DEFAULT_IMAGE_MIN_RESOLUTION,
                    });

                    const updatedImage = new Image();

                    updatedImage.src = drawnToMinResolutionImage;

                    updatedImage.onload = () => {
                        setLoadedImage(updatedImage);
                        setLoadedFileWithoutExifParams({
                            file,
                            image: updatedImage,
                            setLoadedFile,
                        });
                    };

                    return false;
                }

                setLoadedImage(img);
                setLoadedFileWithoutExifParams({
                    file,
                    image: img,
                    setLoadedFile,
                });

                return false;
            };

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
                        resolve(beforeUploadImageCheckings(img));
                        URL.revokeObjectURL(imgSrc);
                    };

                    img.onerror = () => {
                        showNotification(
                            'Произошла ошибка при загрузке фотографии. Попробуйте выбрать другую фотографию',
                            MessageType.Error,
                        );
                        URL.revokeObjectURL(imgSrc);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        },
    };

    return <AntdUpload {...uploadProps} />;
};
