import {createAction} from 'typesafe-actions';

export const getGamesList = createAction('METRO/GET_HH_METRO_LIST')();

export const setGamesList = createAction('METRO/SET_HH_METRO_LIST')<any[]>();
