import {User} from '@src/components/forms/interfaces';
import {Nullable} from '@src/typings';
import {ActionType, createReducer} from 'typesafe-actions';

import * as actions from './actions';

export interface UserState {
    user: Nullable<User>;
    isLoading: boolean;
}

type Actions = ActionType<typeof actions>;

const userState: UserState = {
    user: null,
    isLoading: false,
};

export const userReducer = createReducer<UserState, Actions>(
    userState,
).handleAction(actions.setUser, (state, {payload}) => ({
    ...state,
    user: payload,
    isLoading: false,
}));
