import {RGBColor} from 'react-color';

import {KANBAN_COLUMN_FORM} from './constants';

export interface KanbanColumnFormValues {
    [KANBAN_COLUMN_FORM.title]?: string;
    [KANBAN_COLUMN_FORM.color]?: RGBColor;
}

export interface KanbanEditOrCreateFormProps {
    initialValue?: KanbanColumnFormValues;
    onSubmitForm?: () => void;
    onCloseForm?: () => void;
}
