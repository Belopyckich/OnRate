import {ActionType, createReducer} from 'typesafe-actions';

import * as actions from './actions';

export interface AppState {
    isSidebarOpen: boolean;
}

type Actions = ActionType<typeof actions>;

const userState: AppState = {
    isSidebarOpen: false,
};

export const appReducer = createReducer<AppState, Actions>(
    userState,
).handleAction(actions.setIsSidebarOpen, (state, {payload}) => ({
    ...state,
    isSidebarOpen: payload,
}));
