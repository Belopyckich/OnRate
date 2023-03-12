import {createAction} from 'typesafe-actions';

export const getGamesList = createAction('GAMES/GET_GAMES_LIST')();

export const setGamesList = createAction('GAMES/SET_GAMES_LIST')<any[]>();
