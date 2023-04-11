import * as dialogActions from '@redux/dialog/actions';
import {KanbanEditOrCreateFormProps} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';

import {
    KANBAN_CREATE_COLUMN_DIALOG_TITLE,
    KANBAN_EDIT_COLUMN_DIALOG_TITLE,
    KANBAN_EDIT_OR_CREATE_COLUMN_DIALOG_NAME,
} from './constants';

export const showKanbanEditOrCreateDialog = (
    dialogProps: KanbanEditOrCreateFormProps,
) =>
    dialogActions.show({
        dialogConfig: {
            name: KANBAN_EDIT_OR_CREATE_COLUMN_DIALOG_NAME,
            title: dialogProps.initialValue
                ? KANBAN_EDIT_COLUMN_DIALOG_TITLE
                : KANBAN_CREATE_COLUMN_DIALOG_TITLE,
        },
        dialogProps,
    });

export const closeKanbanEditOrCreateDialog = () =>
    dialogActions.close(KANBAN_EDIT_OR_CREATE_COLUMN_DIALOG_NAME);
