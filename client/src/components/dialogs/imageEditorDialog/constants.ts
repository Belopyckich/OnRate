import {Crop} from 'react-image-crop';

export const IMAGE_EDITOR_DIALOG_NAME = 'IMAGE_EDITOR_DIALOG_NAME';

// на беке минимальное разрешение изображения 128px, поэтому лушче не рисковать ставить меньше)
export const DEFAULT_IMAGE_MIN_RESOLUTION = 128;

export const AVATAR_EDITOR_DESCRIPTION =
    ' Выберите область для маленьких фотографий. Выбранная\n' +
    '                        миниатюра будет использоваться у текущего пользователя.';

export const DEFAULT_CROP_PARAMS: Crop = {
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
};

export const DEFAULT_ASPECT_RATIO = 1;
