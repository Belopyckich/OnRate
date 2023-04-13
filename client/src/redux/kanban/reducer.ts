import {ActionType, createReducer} from 'typesafe-actions';

import * as actions from './actions';
import {KanbanState} from './interfaces';

type Actions = ActionType<typeof actions>;

const gamesState: KanbanState = {
    columns: [],
    kanbanBoardColumns: {},
    isLoading: false,
};

export const kanbanReducer = createReducer<KanbanState, Actions>(gamesState)
    .handleAction(actions.setKanbanBoardColumns, (state, {payload}) => ({
        ...state,
        kanbanBoardDeals: payload,
    }))
    .handleAction(actions.setKanbanColumns, (state, {payload}) => ({
        ...state,
        columns: payload,
    }))
    .handleAction([actions.setKanbanBoardColumn], (state, {payload}) => ({
        ...state,
        kanbanBoardColumns: {
            ...state.kanbanBoardColumns,
            [payload.column_uid]: {
                ...state.kanbanBoardColumns[payload.column_uid],
                ...payload.data,
            },
        },
    }))
    .handleAction(actions.setKanbanIsLoading, (state, {payload}) => ({
        ...state,
        isLoading: payload,
    }));
