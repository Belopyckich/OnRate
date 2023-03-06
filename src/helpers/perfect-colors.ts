import {COLOR_BLACK, COLOR_WHITE} from '@src/constants';

export const getRgbFromString = (color: string) => {
    const colorString = color.includes('rgb') ? color : 'rgb(255,255,255)';

    const rgb = colorString.substr(4).split(')')[0].split(',');

    return {
        R: parseInt(rgb[0], 10),
        G: parseInt(rgb[1], 10),
        B: parseInt(rgb[2], 10),
    };
};

export const getOppositeTitleColor = (color: string) => {
    const {R, G, B} = getRgbFromString(color);
    return R * 0.299 + G * 0.587 + B * 0.114 > 186 ? COLOR_BLACK : COLOR_WHITE;
};
