import * as dialogActions from '@redux/dialog/actions';
import {KanbanEditOrCreateColumnFormProps} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';

import {
    KANBAN_CREATE_TASK_DIALOG_TITLE,
    KANBAN_EDIT_OR_CREATE_TASK_DIALOG_NAME,
    KANBAN_EDIT_TASK_DIALOG_TITLE,
} from './constants';

export const showKanbanEditOrCreateTaskDialog = (
    dialogProps: KanbanEditOrCreateColumnFormProps,
) =>
    dialogActions.show({
        dialogConfig: {
            name: KANBAN_EDIT_OR_CREATE_TASK_DIALOG_NAME,
            title: dialogProps.initialValue
                ? KANBAN_EDIT_TASK_DIALOG_TITLE
                : KANBAN_CREATE_TASK_DIALOG_TITLE,
        },
        dialogProps,
    });

export const closeKanbanEditOrCreateTaskDialog = () =>
    dialogActions.close(KANBAN_EDIT_OR_CREATE_TASK_DIALOG_NAME);
