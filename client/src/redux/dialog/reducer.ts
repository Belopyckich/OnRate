import {DialogState} from '@src/components/dialog/interface';
import {Reducer} from 'redux';
import {ActionType, createReducer, getType} from 'typesafe-actions';

import * as actions from './actions';

type Actions = ActionType<typeof actions>;

export interface DialogsState {
    [key: string]: DialogState;
}

const initialState: DialogsState = {};

export const dialogsReducer = createReducer<DialogsState, Actions>(initialState)
    .handleAction(actions.show, (state, {payload}) => {
        const {dialogConfig} = payload;

        const {name} = dialogConfig;

        if (state[name] && state[name].open) {
            return state;
        }

        return {
            ...state,
            [name]: {
                open: true,
                isLoading: false,
                dialogConfig,
                dialogProps: payload.dialogProps,
            },
        };
    })
    .handleAction(actions.close, (state, {payload: name}) => {
        return {
            ...state,
            [name]: {
                ...state[name],
                open: false,
            },
        };
    });
