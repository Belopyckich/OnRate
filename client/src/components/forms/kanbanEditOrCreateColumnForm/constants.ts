export const KANBAN_COLUMN_FORM = {
    title: 'title',
    color: 'color',
} as const;

export const KANBAN_COLUMN_FORM_LABELS = {
    [KANBAN_COLUMN_FORM.title]: 'Название колонки',
    [KANBAN_COLUMN_FORM.color]: 'Цвет колонки',
} as const;
