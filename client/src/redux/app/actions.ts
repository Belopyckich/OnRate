import {UserForm} from '@src/components/forms/interfaces';
import {createAction} from 'typesafe-actions';

export const setIsSidebarOpen = createAction(
    'APP/SET_IS_SIDEBAR_OPEN',
)<boolean>();

export const loginUser = createAction('APP/LOGIN_USER')<UserForm>();

export const setUser = createAction('APP/SET_USER')<any>();
