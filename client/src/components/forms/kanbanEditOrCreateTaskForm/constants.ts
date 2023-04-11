export const KANBAN_TASK_FORM = {
    title: 'title',
    description: 'description',
} as const;

export const KANBAN_TASK_FORM_LABELS = {
    [KANBAN_TASK_FORM.title]: 'Название задачи',
    [KANBAN_TASK_FORM.description]: 'Описание задачи',
} as const;
