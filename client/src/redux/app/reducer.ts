import {Nullable} from '@src/typings';
import {startCase} from 'lodash';
import {ActionType, createReducer} from 'typesafe-actions';

import * as actions from './actions';
import {User, UserEnvironmentSettings} from './interfaces';

export interface AppState {
    user: Nullable<User>;
    accessToken: Nullable<string>;
    isSidebarOpen: boolean;
    userEnvironmentSettings: Nullable<Partial<UserEnvironmentSettings>>;
    userBackgrounds: Nullable<string[]>;
}

type Actions = ActionType<typeof actions>;

const userState: AppState = {
    user: null,
    accessToken: null,
    isSidebarOpen: false,
    userEnvironmentSettings: null,
    userBackgrounds: null,
};

export const appReducer = createReducer<AppState, Actions>(userState)
    .handleAction(actions.setIsSidebarOpen, (state, {payload}) =>
        state.isSidebarOpen === payload
            ? {...state}
            : {
                  ...state,
                  isSidebarOpen: payload,
              },
    )
    .handleAction(actions.setUser, (state, {payload}) => ({
        ...state,
        user: payload,
    }))
    .handleAction(actions.setAccessToken, (state, {payload}) => ({
        ...state,
        accessToken: payload,
    }))
    .handleAction(actions.setUserEnvironmentSettings, (state, {payload}) => ({
        ...state,
        userEnvironmentSettings: {
            ...state.userEnvironmentSettings,
            ...payload,
        },
    }))
    .handleAction(actions.setBackgrounds, (state, {payload}) => ({
        ...state,
        userBackgrounds: payload,
    }));
