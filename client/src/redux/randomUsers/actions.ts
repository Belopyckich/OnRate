import {createAction} from 'typesafe-actions';

import {User} from '../app/interfaces';

export const setUsers = createAction('USERS/SET_USERS')<User[]>();

export const getUsers = createAction('USERS/GET_USERS')();
