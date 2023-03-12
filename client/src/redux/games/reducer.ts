import {ActionType, createReducer} from 'typesafe-actions';

import * as actions from './actions';

export interface GamesState {
    games: any[];
    current_page: number | null;
    page_count: number | null;
    isLoading: boolean;
}

type Actions = ActionType<typeof actions>;

const gamesState: GamesState = {
    games: [],
    current_page: null,
    page_count: null,
    isLoading: false,
};

export const gamesReducer = createReducer<GamesState, Actions>(
    gamesState,
).handleAction(actions.setGamesList, (state, {payload}) => ({
    ...state,
    games: payload,
    isLoading: false,
}));
