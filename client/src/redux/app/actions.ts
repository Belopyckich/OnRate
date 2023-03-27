import {UserForm} from '@src/components/forms/loginForm/interfaces';
import {RegistrateUserForm} from '@src/components/forms/registrationForm/interfaces';
import {createAction} from 'typesafe-actions';

import {User} from './interfaces';

export const setIsSidebarOpen = createAction(
    'APP/SET_IS_SIDEBAR_OPEN',
)<boolean>();

export const loginUser = createAction('APP/LOGIN_USER')<UserForm>();

export const registrateUser = createAction(
    'APP/REGISTRATE_USER',
)<RegistrateUserForm>();

export const setUser = createAction('APP/SET_USER')<User>();
