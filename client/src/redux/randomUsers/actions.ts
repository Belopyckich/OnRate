import {createAction} from 'typesafe-actions';

export const setUsers = createAction('USERS/SET_USERS')<any[]>();

export const getUsers = createAction('USERS/GET_USERS')();
