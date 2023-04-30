import * as dialogActions from '@redux/dialog/actions';

import {
    MOVE_COLUMN_TASKS_DIALOG_NAME,
    MOVE_COLUMN_TASKS_DIALOG_TITLE,
} from './constants';
import {MoveColumnTasksDialogProps} from './interfaces';

export const showMoveColumnTasksDialog = (
    dialogProps: MoveColumnTasksDialogProps,
) =>
    dialogActions.show({
        dialogConfig: {
            name: MOVE_COLUMN_TASKS_DIALOG_NAME,
            title: MOVE_COLUMN_TASKS_DIALOG_TITLE,
        },
        dialogProps,
    });

export const closeMoveColumnTasksDialog = () =>
    dialogActions.close(MOVE_COLUMN_TASKS_DIALOG_NAME);
