import {User} from '@src/components/forms/interfaces';
import {createAction} from 'typesafe-actions';

export const setUser = createAction('USER/SET_USER')<User>();
