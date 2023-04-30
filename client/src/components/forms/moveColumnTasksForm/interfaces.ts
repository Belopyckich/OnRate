import {MoveColumnTasksDialogProps} from '@src/components/dialogs/moveColumnTasksDialog/interfaces';

import {MOVE_COLUMN_TASKS_FORM} from './constants';

export interface MoveColumnTasksFormValues {
    [MOVE_COLUMN_TASKS_FORM.column]?: string;
}

export interface MoveColumnTasksFormProps extends MoveColumnTasksDialogProps {
    onCloseForm?: () => void;
    onSubmitForm?: () => void;
}
