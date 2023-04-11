import {COLOR_BLACK, COLOR_WHITE} from '@src/constants';
import {RGBColor} from 'react-color';

export const getRgbStyleFromString = (color: RGBColor) =>
    `rgb(${color.r},${color.g},${color.b})`;

export const getOppositeTitleColor = ({r, g, b}: RGBColor) =>
    r * 0.299 + g * 0.587 + b * 0.114 > 186 ? COLOR_BLACK : COLOR_WHITE;

export const checkIsLightBackground = ({r, g, b}: RGBColor) =>
    r > 230 && g > 230 && b > 230;
