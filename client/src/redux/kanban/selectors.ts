import {State} from '@redux/reducers';

export const selectKanbanColumns = (state: State) => state.kanban.columns;

export const selectKanbanBoardDeals = (state: State) =>
    state.kanban.kanbanBoardDeals;

export const selectKanbanIsLoading = (state: State) => state.kanban.isLoading;

export const selectKanbanBoardColumnDeals = (
    state: State,
    column_uid: number,
) => {
    const column = state.kanban.kanbanBoardDeals[column_uid];
    return column ? column : [];
};
