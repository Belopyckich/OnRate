import {Crop} from 'react-image-crop/dist/types';

export const IMAGE_EDITOR_DIALOG_NAME = 'IMAGE_EDITOR_DIALOG_NAME';

export const IMAGE_EDITOR_DIALOG_TITLE = 'Загрузка новой фотографии';

// на беке минимальное разрешение изображения 128px, поэтому лушче не рисковать ставить меньше)
export const DEFAULT_IMAGE_MIN_RESOLUTION = 128;

export const DEFAULT_ASPECT_RATIO = 1;

export const DEFAULT_CROP_PARAMS: Crop = {
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
};

export const DEFAULT_IMAGE_FILE_TYPES_FOR_UPLOADER = '.png, .jpg, .jpeg';
export const DEFAULT_IMAGE_FILE_TYPES_FOR_UPLOADER_WITH_GIF =
    '.png, .jpg, .jpeg, .gif';
export const DOCUMENT_FILE_TYPES_FOR_UPLOADER = '.doc, .docx';

export const DEFAULT_FILE_MAX_SIZE = 5000000;
export const DEFAULT_FILE_SIZE_DIVIDER = 1000000;
