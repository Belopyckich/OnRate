import {CloseOutlined} from '@ant-design/icons';
import * as dialogActions from '@redux/dialog/actions';
import React from 'react';
import {RGBColor} from 'react-color';
import {useDispatch} from 'react-redux';

import {ColorSelection} from '../dialogs/colorPicker/interfaces';
import {TextOverflow} from '../textOverflow/text-overflow';
import styles from './styles.module.scss';

export interface ColumnOptionProps {
    description: string;
    colorRGB: RGBColor;
}

export const ColorOption = ({description, colorRGB}: ColumnOptionProps) => {
    const background = `rgb(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b})`;

    const boxShadow =
        colorRGB.b !== 255
            ? `0 0 5px rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, 0.9)`
            : '0 0 2px rgba(126, 126, 126, .9)';

    return (
        <div className={styles.colorOption}>
            <div
                className={styles.colorOptionIcon}
                style={{
                    backgroundColor: background,
                    boxShadow,
                }}
            />

            <TextOverflow text={description} />
        </div>
    );
};
