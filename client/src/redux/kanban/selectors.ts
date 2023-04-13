import {State} from '@redux/reducers';

export const selectKanbanColumns = (state: State) => state.kanban.columns;

export const selectKanbanBoardDeals = (state: State) =>
    state.kanban.kanbanBoardColumns;

export const selectKanbanIsLoading = (state: State) => state.kanban.isLoading;

export const selectKanbanBoardColumn = (state: State, column_uid: string) => {
    const column = state.kanban.kanbanBoardColumns[column_uid];
    return column ? column : undefined;
};
