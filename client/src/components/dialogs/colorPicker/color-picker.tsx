import {TextOverflow} from '@src/components/textOverflow/text-overflow';
import {Form, FormItemProps, Select} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, {useEffect, useState} from 'react';
import {RGBColor} from 'react-color';
import {useDispatch} from 'react-redux';

import {showColorPickerDialog} from './actions';
import {ColorPickerDialog} from './color-picker-dialog';
import {DEFAULT_COLOR_OPTIONS} from './constants';
import {ColorPickerProps, ColorSelection, EColor} from './interfaces';
import styles from './styles.module.scss';

export const ColorPicker = ({form, ...props}: ColorPickerProps) => {
    const dispatch = useDispatch();

    const {setFieldsValue} = form;

    const [options, setOptions] = useState(DEFAULT_COLOR_OPTIONS);
    const [colorType, setColorType] = useState<EColor>(EColor.Standard);

    const renderOption = (option: ColorSelection) => {
        const {colorRGB, description} = option;

        const background = `rgb(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b})`;

        const boxShadow =
            colorRGB.b !== 255
                ? `0 0 5px rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, 0.9)`
                : '0 0 2px rgba(126, 126, 126, .9)';

        return (
            <div className={styles.colorPickerItem}>
                <div
                    className={styles.colorPickerIcon}
                    style={{
                        backgroundColor: background,
                        boxShadow,
                    }}
                />

                <TextOverflow text={description} />
            </div>
        );
    };

    return (
        <Form.Item {...props}>
            <Select
                value={colorType}
                onSelect={(value: EColor) => {
                    const isDefaultColorType = EColor.Custom === value;

                    const colorRgb = options[value].colorRGB;

                    if (isDefaultColorType) {
                        dispatch(
                            showColorPickerDialog({
                                color: colorRgb,
                                onOkClicked: (color) => {
                                    setOptions({
                                        ...options,
                                        [EColor.Custom]: {
                                            ...options[EColor.Custom],
                                            colorRGB: color,
                                        },
                                    });
                                    setColorType(EColor.Custom);
                                    setFieldsValue({
                                        [props.name]: color,
                                    });
                                },
                            }),
                        );
                    }

                    setColorType(value);
                    setFieldsValue({
                        [props.name]: colorRgb,
                    });
                }}
            >
                {Object.keys(options).map((key: EColor) => (
                    <Select.Option
                        value={options[key].colorType}
                        key={options[key].description}
                    >
                        {renderOption(options[key])}
                    </Select.Option>
                ))}
            </Select>

            <ColorPickerDialog />
        </Form.Item>
    );
};

export default ColorPicker;
