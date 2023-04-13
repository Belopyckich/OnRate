export const KANBAN_TASK_FORM = {
    title: 'title',
    description: 'description',
    column: 'column',
} as const;

export const KANBAN_TASK_FORM_LABELS = {
    [KANBAN_TASK_FORM.title]: 'Название задачи',
    [KANBAN_TASK_FORM.description]: 'Описание задачи',
    [KANBAN_TASK_FORM.column]: 'Колонка',
} as const;
