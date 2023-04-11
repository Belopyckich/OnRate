import {RGBColor} from 'react-color';

import {KANBAN_COLUMN_FORM} from './constants';

export interface KanbanColumnFormValues {
    [KANBAN_COLUMN_FORM.title]?: string;
    [KANBAN_COLUMN_FORM.color]?: RGBColor;
}

export type CreateKanbanColumnProps = KanbanColumnFormValues;

export interface EditKanbanColumnProps extends KanbanColumnFormValues {
    _id: string;
}

export enum ColumnFormType {
    Create = 'Create',
    Edit = 'Edit',
}
export interface BasicEditOrCreateColumnFormProps {
    onSubmitForm?: () => void;
    onCloseForm?: () => void;
}

export type KanbanEditOrCreateColumnFormProps =
    BasicEditOrCreateColumnFormProps &
        (
            | {
                  type: ColumnFormType.Create;
                  _id?: undefined;
                  initialValue?: undefined;
              }
            | {
                  type: ColumnFormType.Edit;
                  _id: string;
                  initialValue: KanbanColumnFormValues;
              }
        );
