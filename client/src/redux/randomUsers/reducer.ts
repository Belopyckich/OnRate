import {ActionType, createReducer} from 'typesafe-actions';

import * as actions from './actions';
import {UsersState} from './interfaces';

type Actions = ActionType<typeof actions>;

const userState: UsersState = {
    users: [],
    isLoading: false,
};

export const userReducer = createReducer<UsersState, Actions>(userState);
