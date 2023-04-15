export enum KanbanColumnDropdownKeys {
    AddTask = 'AddTask',
    DuplicateColumn = 'DuplicateColumn',
    MoveTasks = 'MoveTasks',
    DeleteTasks = 'DeleteTasks',
}

export const KANBAN_COLUMN_DROPDOWN_TITLES = {
    [KanbanColumnDropdownKeys.AddTask]: 'Добавить карточку',
    [KanbanColumnDropdownKeys.DuplicateColumn]: 'Дублировать колонку',
    [KanbanColumnDropdownKeys.MoveTasks]: 'Переместить список',
    [KanbanColumnDropdownKeys.DeleteTasks]: 'Удалить колонку',
};
