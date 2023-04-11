import {KANBAN_TASK_FORM} from './constants';

export interface KanbanTaskFormValues {
    [KANBAN_TASK_FORM.title]?: string;
    [KANBAN_TASK_FORM.description]?: string;
}

export type CreateKanbanTaskProps = KanbanTaskFormValues;

export interface EditKanbanTaskProps extends KanbanTaskFormValues {
    _id: string;
}

export enum TaskFormType {
    Create = 'Create',
    Edit = 'Edit',
}
export interface BasicEditOrCreateTaskFormProps {
    onSubmitForm?: () => void;
    onCloseForm?: () => void;
}

export type KanbanEditOrCreateTaskFormProps = BasicEditOrCreateTaskFormProps &
    (
        | {
              type: TaskFormType.Create;
              _id?: undefined;
              initialValue?: undefined;
          }
        | {
              type: TaskFormType.Edit;
              _id: string;
              initialValue: KanbanTaskFormValues;
          }
    );
