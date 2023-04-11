import * as dialogActions from '@redux/dialog/actions';

import {
    KANBAN_SETTINGS_DIALOG_NAME,
    KANBAN_SETTINGS_DIALOG_TITLE,
} from './constants';

export const showKanbanSettingsDialog = () =>
    dialogActions.show({
        dialogConfig: {
            name: KANBAN_SETTINGS_DIALOG_NAME,
            title: KANBAN_SETTINGS_DIALOG_TITLE,
        },
        dialogProps: {},
    });

export const closeKanbanSettingsDialog = () =>
    dialogActions.close(KANBAN_SETTINGS_DIALOG_NAME);
