import {UserForm} from '@src/components/forms/loginForm/interfaces';
import {RegistrateUserForm} from '@src/components/forms/registrationForm/interfaces';
import {UpdateUserProps} from '@src/components/forms/userSettingsForm/interfaces';
import {Nullable} from '@src/typings';
import {createAction} from 'typesafe-actions';

import {User} from './interfaces';

export const setIsSidebarOpen = createAction(
    'APP/SET_IS_SIDEBAR_OPEN',
)<boolean>();

export const loginUser = createAction('APP/LOGIN_USER')<UserForm>();

export const checkAuth = createAction('APP/CHECK_AUTH')();

export const logoutUser = createAction('APP/LOGOUT_USER')();

export const updateUser = createAction('APP/UPDATE_USER')<UpdateUserProps>();

export const setAccessToken = createAction('APP/SET_ACCESS_TOKEN')<
    Nullable<string>
>();

export const registrateUser = createAction(
    'APP/REGISTRATE_USER',
)<RegistrateUserForm>();

export const setUser = createAction('APP/SET_USER')<Nullable<User>>();
