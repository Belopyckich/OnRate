import {messages} from '@src/constants/messages';

import {showNotification} from '../showNotification/show-notification';
import {
    DrawImageToMinResolution,
    SetLoadedFileWithoutExifParamsProps,
} from './interfaces';

export const drawImageToMinResolution = ({
    image,
    minWidth,
}: DrawImageToMinResolution) => {
    const {naturalHeight, naturalWidth} = image;

    const isImageWidthLessThanMinWidth = naturalWidth < minWidth;
    const isImageHeightLessThanMinWidth = naturalHeight < minWidth;

    const canvasWidth = isImageWidthLessThanMinWidth ? minWidth : naturalWidth;
    const canvasHeight = isImageHeightLessThanMinWidth
        ? minWidth
        : naturalHeight;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const drawImageXPosition = isImageWidthLessThanMinWidth
        ? (minWidth - naturalWidth) / 2
        : 0;
    const drawImageYPosition = isImageHeightLessThanMinWidth
        ? (minWidth - naturalWidth) / 2
        : 0;

    if (context) {
        context.filter = 'blur(10px)';
        context.drawImage(image, 0, 0, canvasWidth, canvasHeight);

        context.filter = 'blur(0px)';
        context.drawImage(
            image,
            drawImageXPosition,
            drawImageYPosition,
            naturalWidth,
            naturalHeight,
        );
    }

    return canvas.toDataURL('image/jpeg');
};

export const setLoadedFileWithoutExifParams = ({
    file,
    image,
    setLoadedFile,
}: SetLoadedFileWithoutExifParamsProps) => {
    if (file && image) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        if (context) {
            context.drawImage(image, 0, 0, image.naturalWidth, image.height);
        }

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    throw new Error();
                }

                setLoadedFile(new File([blob], file.name, {type: file.type}));
            },
            file.type,
            0.9,
        );
    }
};

export const checkFileFormat = (file: File, fileAcceptFormat: string) => {
    const isAccessibleFileFormat = checkFileExtensionAccessibilityHelper(
        file,
        fileAcceptFormat,
    );

    if (!isAccessibleFileFormat) {
        showNotification(messages.fileFormatError);
        return true;
    }

    return false;
};

export const checkFileSize = (file: File, fileMaxSize: number) => {
    const isAccessibleFileSize = file.size < fileMaxSize;

    if (!isAccessibleFileSize) {
        showNotification(`${messages.fileSize} ${fileMaxSize / 1000000}МБ`);
        return true;
    }

    return false;
};

export const checkImageAspectRatio = (image: HTMLImageElement) => {
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;

    const isAccessibleFileAspectRatio =
        imageWidth / imageHeight < 2 && imageHeight / imageWidth < 2;

    if (!isAccessibleFileAspectRatio) {
        showNotification(
            'Длина одной из сторон изображения не может превышать длину другой более чем в 2 раза. Пожалуйста, используйте другое изображение',
        );
        return true;
    }

    return false;
};

export const checkFileExtensionAccessibilityHelper = (
    file: File,
    accepted: string,
) => {
    const fileExtension = file.name.toLowerCase().split('.').pop();
    if (fileExtension && accepted.indexOf(fileExtension) !== -1) {
        return true;
    }
    return false;
};
