import 'react-image-crop/dist/ReactCrop.css';

import {closeImageEditorDialog} from '@components/dialogs/imageEditorDialog/actions';
import {ConnectedDialog} from '@src/components/dialog/dialog';
import {Avatar, Button, Upload, UploadProps} from 'antd';
import React, {useEffect, useState} from 'react';
import {
    ColorChangeHandler,
    ColorResult,
    RGBColor,
    SketchPicker,
} from 'react-color';
import ReactCrop, {Crop} from 'react-image-crop';
import {useDispatch} from 'react-redux';

import {closeColorPickerDialog} from './actions';
import {
    COLOR_PICKER_DIALOG_NAME,
    COLOR_PICKER_DIALOG_WIDTH,
    DEFAULT_COLOR_WHITE,
    PRESET_COLORS,
} from './constants';
import {ColorPickerDialogProps} from './interfaces';
import styles from './styles.module.scss';

export const ColorPickerDialog = () => (
    <ConnectedDialog
        name={COLOR_PICKER_DIALOG_NAME}
        DialogBody={ColorPickerDialogBody}
        wrapClassName={styles.colorPickerDialog}
        destroyOnClose={true}
        maxWidth={COLOR_PICKER_DIALOG_WIDTH}
    />
);

const ColorPickerDialogBody = ({
    color,
    onOkClicked,
}: ColorPickerDialogProps) => {
    const dispatch = useDispatch();

    const [selectedColor, setSelectedColor] = useState<RGBColor>(
        color || DEFAULT_COLOR_WHITE,
    );

    const onCustomColorPicked = ({rgb}: ColorResult) => setSelectedColor(rgb);

    const onSubmit = () => {
        onOkClicked(selectedColor);
        dispatch(closeColorPickerDialog());
    };

    const onCancel = () => dispatch(closeColorPickerDialog());

    return (
        <>
            <SketchPicker
                disableAlpha={true}
                color={selectedColor}
                presetColors={PRESET_COLORS}
                onChangeComplete={onCustomColorPicked}
                width={`auto`}
            />

            <div className={styles.colorPickerDialogButtons}>
                <Button type="primary" onClick={onSubmit}>
                    Выбрать
                </Button>

                <Button onClick={onCancel}>Отмена</Button>
            </div>
        </>
    );
};
