import {ActionType, createReducer} from 'typesafe-actions';

import * as actions from './actions';
import {KanbanState} from './interfaces';

type Actions = ActionType<typeof actions>;

const gamesState: KanbanState = {
    columns: [],
    kanbanBoardDeals: {
        ['1']: [
            {uid: 1, title: '1 задача', text: 'Текст первой задачи'},
            {uid: 2, title: '2 задача', text: 'Текст второй задачи'},
            {uid: 3, title: 'третья задача', text: 'Текст третьей задачи'},
            {uid: 4, title: '4 задача', text: 'Текст четвертой задачи'},
        ],
        ['2']: [],
        ['3']: [
            {uid: 13, title: '1 задача', text: 'Текст первой задачи 3'},
            {uid: 23, title: '2 задача', text: 'Текст второй задачи 3 '},
            {uid: 33, title: 'третья задача', text: 'Текст третьей задачи 3'},
            {uid: 43, title: '4 задача', text: 'Текст четвертой задачи 3'},
        ],
    },
    isLoading: false,
};

export const kanbanReducer = createReducer<KanbanState, Actions>(gamesState)
    .handleAction(actions.setKanbanBoardDeals, (state, {payload}) => ({
        ...state,
        kanbanBoardDeals: payload,
    }))
    .handleAction(actions.setKanbanColumns, (state, {payload}) => ({
        ...state,
        columns: payload,
    }))
    .handleAction(actions.setKanbanIsLoading, (state, {payload}) => ({
        ...state,
        isLoading: payload,
    }));
