import {ActionType, createReducer} from 'typesafe-actions';

import * as actions from './actions';

export interface AppState {
    user: any;
    isSidebarOpen: boolean;
}

type Actions = ActionType<typeof actions>;

const userState: AppState = {
    user: null,
    isSidebarOpen: false,
};

export const appReducer = createReducer<AppState, Actions>(userState)
    .handleAction(actions.setIsSidebarOpen, (state, {payload}) => ({
        ...state,
        isSidebarOpen: payload,
    }))
    .handleAction(actions.setUser, (state, {payload}) => ({
        ...state,
        user: payload,
    }));
