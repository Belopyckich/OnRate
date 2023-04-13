import {ColorOption} from '@src/components/colorOption/color-option';
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

export const ColorPicker = ({
    form,
    initialValue,
    ...props
}: ColorPickerProps) => {
    const dispatch = useDispatch();

    const {setFieldsValue} = form;

    const [options, setOptions] = useState(DEFAULT_COLOR_OPTIONS);
    const [colorType, setColorType] = useState<EColor>(EColor.Standard);

    useEffect(() => {
        if (initialValue) {
            const foundedColorSelection = Object.values(options).find(
                (colorSelection) =>
                    JSON.stringify(colorSelection.colorRGB) ===
                    JSON.stringify(initialValue),
            );

            if (foundedColorSelection) {
                setColorType(foundedColorSelection.colorType);
                setFieldsValue({
                    [props.name]: initialValue,
                });
            } else {
                onAddNewColor(initialValue);
            }
        } else {
            setColorType(EColor.Standard);
            setFieldsValue({
                [props.name]: options[EColor.Standard].colorRGB,
            });
        }
    }, []);

    const onAddNewColor = (color: RGBColor) => {
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
                                onOkClicked: onAddNewColor,
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
                        <ColorOption
                            colorRGB={options[key].colorRGB}
                            description={options[key].description}
                        />
                    </Select.Option>
                ))}
            </Select>

            <ColorPickerDialog />
        </Form.Item>
    );
};

export default ColorPicker;
