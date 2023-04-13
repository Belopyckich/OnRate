import {DraggableLocation} from 'react-beautiful-dnd';

import {
    KanbanBoardColumn,
    KanbanColumnProps,
    KanbanColumnPropsFromDb,
    KanbanTaskProps,
} from './interfaces';

export const formatColumnsDataFromDb = (
    kanbanColumn: KanbanColumnPropsFromDb,
) => ({
    ...kanbanColumn,
    color: {
        r: kanbanColumn.color.r,
        g: kanbanColumn.color.g,
        b: kanbanColumn.color.b,
    },
});

export const reorderColumnList = (
    list: KanbanColumnProps[],
    startIndex: number,
    endIndex: number,
) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result.map((column, index) => ({
        ...column,
        position: index,
    }));
};

export const reorderTasksInColumns = (
    sourceColumn: KanbanTaskProps[],
    destinationColumn: KanbanTaskProps[],
    source: DraggableLocation,
    destination: DraggableLocation,
) => {
    const isTaskColumnChanged = source.droppableId !== destination.droppableId;

    if (isTaskColumnChanged) {
        const sourceColumnTasks = Array.from(sourceColumn);
        const destinationColumnTasks = Array.from(destinationColumn);

        const [removed] = sourceColumnTasks.splice(source.index, 1);

        destinationColumnTasks.splice(destination.index, 0, removed);

        return {
            newSourceColumnTasks: sourceColumnTasks.map((column, index) => ({
                ...column,
                position: index,
            })),
            newDestinationColumnTasks: destinationColumnTasks.map(
                (column, index) => ({
                    ...column,
                    position: index,
                }),
            ),
        };
    }

    const sourceColumnTasks = Array.from(sourceColumn);

    const [removed] = sourceColumnTasks.splice(source.index, 1);

    sourceColumnTasks.splice(destination.index, 0, removed);

    const newSourceColumnTasks = sourceColumnTasks.map((column, index) => ({
        ...column,
        position: index,
    }));

    return {
        newSourceColumnTasks,
        newDestinationColumnTasks: newSourceColumnTasks,
    };
};
