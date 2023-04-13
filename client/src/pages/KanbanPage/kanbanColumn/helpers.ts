import {KanbanTaskProps} from '@src/redux/kanban/interfaces';

export const sortKanbanColumnTasks = (tasks: KanbanTaskProps[]) =>
    tasks.sort((a, b) => a.position - b.position);
