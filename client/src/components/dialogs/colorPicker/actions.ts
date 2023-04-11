import * as dialogActions from '@redux/dialog/actions';

import {COLOR_PICKER_DIALOG_NAME, COLOR_PICKER_DIALOG_TITLE} from './constants';
import {ColorPickerDialogProps} from './interfaces';

export const showColorPickerDialog = (dialogProps: ColorPickerDialogProps) =>
    dialogActions.show({
        dialogConfig: {
            name: COLOR_PICKER_DIALOG_NAME,
            title: COLOR_PICKER_DIALOG_TITLE,
        },
        dialogProps,
    });

export const closeColorPickerDialog = () =>
    dialogActions.close(COLOR_PICKER_DIALOG_NAME);
