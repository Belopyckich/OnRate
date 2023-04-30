import {UserForm} from '@src/components/forms/loginForm/interfaces';
import {RegistrateUserForm} from '@src/components/forms/registrationForm/interfaces';
import {UpdateUserProps} from '@src/components/forms/userSettingsForm/interfaces';
import {Nullable} from '@src/typings';
import {createAction} from 'typesafe-actions';

import {
    CheckIsAuthActionProps,
    User,
    UserEnvironmentSettings,
} from './interfaces';

export const setIsSidebarOpen = createAction(
    'APP/SET_IS_SIDEBAR_OPEN',
)<boolean>();

export const loginUser = createAction('APP/LOGIN_USER')<UserForm>();

export const setUserBackground = createAction(
    'APP/SET_USER_BACKGROUND',
)<string>();

export const checkAuth =
    createAction('APP/CHECK_AUTH')<CheckIsAuthActionProps>();

export const logoutUser = createAction('APP/LOGOUT_USER')();

export const updateUser = createAction('APP/UPDATE_USER')<UpdateUserProps>();

export const setAccessToken = createAction('APP/SET_ACCESS_TOKEN')<
    Nullable<string>
>();

export const registrateUser = createAction(
    'APP/REGISTRATE_USER',
)<RegistrateUserForm>();

export const setUser = createAction('APP/SET_USER')<Nullable<User>>();

export const setUserStartPage = createAction(
    'APP/SET_USER_START_PAGE',
)<string>();

export const getBackgrounds = createAction('APP/GET_BACKGROUNDS')();

export const setBackgrounds = createAction('APP/SET_BACKGROUNDS')<string[]>();

export const setUserEnvironmentSettings = createAction(
    'APP/SET_USER_ENVIRONMENT_SETTINGS',
)<Nullable<Partial<UserEnvironmentSettings>>>();
