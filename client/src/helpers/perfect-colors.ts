import {COLOR_BLACK, COLOR_WHITE} from '@src/constants';
import {Any} from '@src/typings';
import Color from 'color';
import {RGBColor} from 'react-color';

import {devLog} from './dev-log';

export const getRgbFromString = (color: string) => {
    try {
        const rgbColor: RGBColor = JSON.parse(color);

        return rgbColor;
    } catch (e) {
        devLog(e, 'getRgbFromStringError');

        return {
            r: 255,
            g: 255,
            b: 255,
        };
    }
};

export const getRgbStyleFromString = (color: string) => {
    try {
        const rgbColor: RGBColor = JSON.parse(color);

        return `rgb(${rgbColor.r},${rgbColor.g},${rgbColor.b})`;
    } catch (e) {
        devLog(e, 'getRgbStyleFromString');
        return 'rgb(255,255,255)';
    }
};

export const getOppositeTitleColor = (color: string) => {
    const {r, g, b} = getRgbFromString(color);
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? COLOR_BLACK : COLOR_WHITE;
};

export const checkIsLightBackground = (background: Any) => {
    const {r, g, b} = getRgbFromString(background);
    return r > 230 && g > 230 && b > 230;
};
