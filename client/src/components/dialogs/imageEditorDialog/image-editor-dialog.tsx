import 'react-image-crop/dist/ReactCrop.css';

import {closeImageEditorDialog} from '@components/dialogs/imageEditorDialog/actions';
import {ConnectedDialog} from '@src/components/dialog/dialog';
import {Avatar, Button, Upload, UploadProps} from 'antd';
import React, {useEffect, useState} from 'react';
import ReactCrop, {Crop} from 'react-image-crop';
import {useDispatch} from 'react-redux';

import {
    AVATAR_EDITOR_DESCRIPTION,
    DEFAULT_ASPECT_RATIO,
    DEFAULT_CROP_PARAMS,
    DEFAULT_IMAGE_MIN_RESOLUTION,
    IMAGE_EDITOR_DIALOG_NAME,
} from './constants';
import {FormDataCropParams, ImageEditorDialogProps} from './interfaces';
import styles from './styles.module.scss';

export const ImageEditorDialog = () => (
    <ConnectedDialog
        name={IMAGE_EDITOR_DIALOG_NAME}
        DialogBody={ImageEditorDialogBody}
        destroyOnClose={true}
        maxWidth={520}
    />
);

const ImageEditorDialogBody = ({
    loadedFile,
    loadedImage,
    imageNaturalSlideState,
    uploadFileCallback,
}: ImageEditorDialogProps) => {
    const dispatch = useDispatch();

    const [cropParams, setCropParams] = useState<Crop>();
    const [completedCropParams, setCompletedCropParams] =
        useState<Crop>(DEFAULT_CROP_PARAMS);
    const [completedNaturalCropParams, setCompletedNaturalCropParams] =
        useState<FormDataCropParams>();
    const [croppedImageSrc, setCroppedImageSrc] = useState<string>();
    const [loadedImageInView, setLoadedImageInView] =
        useState<HTMLImageElement>();

    const isImageWidthLessThenMinResolution = imageNaturalSlideState
        ? imageNaturalSlideState.width < DEFAULT_IMAGE_MIN_RESOLUTION
        : undefined;

    const isImageHeightLessThenMinResolution = imageNaturalSlideState
        ? imageNaturalSlideState.height < DEFAULT_IMAGE_MIN_RESOLUTION
        : undefined;

    const onLoad = (image: React.SyntheticEvent<HTMLImageElement>) => {
        const imageStyles = getComputedStyle(image.currentTarget);

        const imageHeight = parseInt(imageStyles.height, 10);
        const imageWidth = parseInt(imageStyles.width, 10);

        if (imageHeight && imageWidth) {
            if (
                isImageHeightLessThenMinResolution ||
                isImageWidthLessThenMinResolution
            ) {
                const cropWidthToUse =
                    imageWidth > imageHeight ? imageHeight : imageWidth;

                const width = (cropWidthToUse * 100) / imageWidth;

                const height = (cropWidthToUse * 100) / imageHeight;

                const x = (100 - width) / 2;
                const y = 50 - (100 * cropWidthToUse) / 2 / imageHeight;

                setCropParams({
                    unit: '%',
                    width,
                    height,
                    x,
                    y,
                });
            } else {
                const cropWidthToUse =
                    imageWidth > imageHeight ? imageHeight / 2 : imageWidth / 2;

                const width = (cropWidthToUse * 100) / imageWidth;
                const height = (cropWidthToUse * 100) / imageHeight;

                const x = (100 - width) / 2;
                const y = 50 - (100 * cropWidthToUse) / 2 / imageHeight;

                setCropParams({
                    unit: '%',
                    width,
                    height,
                    x,
                    y,
                });
            }

            setLoadedImageInView(image.currentTarget);

            return false;
        }

        return false;
    };

    useEffect(() => {
        if (!completedCropParams || !loadedImageInView) {
            return;
        }

        const crop = completedCropParams;

        const scaleX = loadedImageInView.naturalWidth / loadedImageInView.width;
        const scaleY =
            loadedImageInView.naturalHeight / loadedImageInView.height;
        const pixelRatio = window.devicePixelRatio;

        const canvas = document.createElement('canvas');

        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;

        const context = canvas.getContext('2d');

        if (context) {
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            context.imageSmoothingQuality = 'high';

            context.drawImage(
                loadedImage,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width * scaleX,
                crop.height * scaleY,
            );
        }

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    console.error('Canvas is Empty');
                    return;
                }

                const imageSrc = URL.createObjectURL(blob);
                setCroppedImageSrc(imageSrc);
            },
            loadedFile.type,
            1,
        );

        setCompletedNaturalCropParams({
            width: crop.width * scaleX,
            height: crop.height * scaleY,
            x: crop.x * scaleX,
            y: crop.y * scaleY,
        });
    }, [completedCropParams, loadedImageInView]);

    const onCropComplete = (crop: Crop) => setCompletedCropParams(crop);

    const onCropChange = (crop: Crop, persentCrop: Crop) =>
        setCropParams(persentCrop);

    const onSave = () => {
        if (completedNaturalCropParams && croppedImageSrc) {
            uploadFileCallback({
                file: loadedFile,
                cropParams: completedNaturalCropParams,
                src: croppedImageSrc,
            });
            dispatch(closeImageEditorDialog());
        }
    };

    const getMinCropWidthAndHeight = () => {
        if (
            (isImageWidthLessThenMinResolution ||
                isImageHeightLessThenMinResolution) &&
            loadedImageInView
        ) {
            return loadedImageInView.height < loadedImageInView.width
                ? loadedImageInView.height
                : loadedImageInView.width;
        }

        return DEFAULT_IMAGE_MIN_RESOLUTION;
    };

    return (
        <div className={styles.imageEditor}>
            <ReactCrop
                crop={cropParams}
                ruleOfThirds={true}
                keepSelection={true}
                minHeight={getMinCropWidthAndHeight()}
                minWidth={getMinCropWidthAndHeight()}
                onChange={onCropChange}
                onComplete={onCropComplete}
                aspect={DEFAULT_ASPECT_RATIO}
            >
                <img
                    src={loadedImage.src}
                    style={{height: '100%', width: '100%'}}
                    onLoad={onLoad}
                />
            </ReactCrop>

            <span className={styles.imageEditorDescriptionWrapper}>
                <span className={styles.imageEditorDescriptionTitle}>
                    Предварительный просмотр
                </span>

                <span className={styles.imageEditorDescription}>
                    {AVATAR_EDITOR_DESCRIPTION}
                </span>
            </span>

            <div className={styles.imageEditorAvatarsWrapper}>
                <Avatar src={croppedImageSrc} size={150} />

                <Avatar src={croppedImageSrc} size={40} />
            </div>

            <div className={styles.imageEditorActionButtons}>
                <Button
                    disabled={!completedCropParams}
                    onClick={onSave}
                    type="primary"
                >
                    Сохранить
                </Button>

                <Button onClick={() => dispatch(closeImageEditorDialog())}>
                    Выйти
                </Button>
            </div>
        </div>
    );
};
