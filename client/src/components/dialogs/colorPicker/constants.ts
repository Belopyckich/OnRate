import {Color} from 'react-color';

import {ColorSelection, EColor} from './interfaces';

export const COLOR_PICKER_DIALOG_NAME = 'COLOR_PICKER_DIALOG_NAME';

export const COLOR_PICKER_DIALOG_TITLE = 'Выберите цвет';

export const COLOR_PICKER_DIALOG_WIDTH = 400;

export const DEFAULT_COLOR_WHITE = {
    r: 255,
    g: 255,
    b: 255,
};

export const CUSTOM_DEFAULT_COLOR = {
    r: 0,
    g: 0,
    b: 0,
};

export const PRESET_COLORS = [
    '#ffffff',
    '#A7A7A7',
    '#000000',
    '#F54337',
    '#E91D64',
    '#9C28B1',
    '#3F51B5',
    '#2196F3',
    '#02BCD5',
    '#029688',
    '#4CB050',
    '#8CC34B',
    '#FFEC3A',
    '#FFC208',
    '#FF9801',
    '#FE5722',
];

export const DEFAULT_COLOR_OPTIONS: {[key in EColor]: ColorSelection} = {
    [EColor.Standard]: {
        colorType: EColor.Standard,
        description: 'Стандартный',
        colorRGB: DEFAULT_COLOR_WHITE,
    },
    [EColor.Negative]: {
        colorType: EColor.Negative,
        description: 'Негативный',
        colorRGB: {r: 248, g: 50, b: 51},
    },
    [EColor.Positive]: {
        colorType: EColor.Positive,
        description: 'Позитивный',
        colorRGB: {r: 81, g: 154, b: 68},
    },
    [EColor.Attention]: {
        colorType: EColor.Attention,
        description: 'Внимание',
        colorRGB: {r: 255, g: 202, b: 47},
    },
    [EColor.Custom]: {
        colorType: EColor.Custom,
        description: 'Другой...',
        colorRGB: CUSTOM_DEFAULT_COLOR,
    },
};
