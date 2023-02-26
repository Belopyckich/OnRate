import {ActionType, createReducer} from 'typesafe-actions';

import * as actions from './actions';
import {UsersState} from './interfaces';

type Actions = ActionType<typeof actions>;

const userState: UsersState = {
    currentUser: null,
    users: [],
    isLoading: false,
};

export const userReducer = createReducer<UsersState, Actions>(userState)
    .handleAction(actions.setCurrentUser, (state, {payload}) => ({
        ...state,
        currentUser: payload,
    }))
    .handleAction(actions.setUsers, (state, {payload}) => ({
        ...state,
        users: payload,
        isLoading: false,
    }));
