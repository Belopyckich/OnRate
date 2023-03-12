import {User as UserForm} from '@components/forms/interfaces';
import {createAction} from 'typesafe-actions';

import {User} from './interfaces';

export const setCurrentUser = createAction('USERS/SET_CURRENT_USER')<User>();

export const loginCurrentUser = createAction(
    'USERS/LOGIN_CURRENT_USER',
)<UserForm>();

export const setUsers = createAction('USERS/SET_USERS')<User[]>();

export const getUsers = createAction('USERS/GET_USERS')();
