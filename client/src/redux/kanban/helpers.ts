import {KanbanColumnProps, KanbanColumnPropsFromDb} from './interfaces';

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
