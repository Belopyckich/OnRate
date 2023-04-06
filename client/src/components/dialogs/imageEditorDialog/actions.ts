import * as dialogActions from '@redux/dialog/actions';

import {IMAGE_EDITOR_DIALOG_NAME} from './constants';
import {ImageEditorDialogProps, ImageEditorTitleType} from './interfaces';

export const showImageEditorDialog = (
    dialogProps: ImageEditorDialogProps,
    title?: ImageEditorTitleType,
) =>
    dialogActions.show({
        dialogConfig: {
            name: IMAGE_EDITOR_DIALOG_NAME,
            title: title || ImageEditorTitleType.Default,
        },
        dialogProps,
    });

export const closeImageEditorDialog = () =>
    dialogActions.close(IMAGE_EDITOR_DIALOG_NAME);
