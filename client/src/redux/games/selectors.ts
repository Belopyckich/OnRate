import {State} from '@redux/reducers';

export const selectGamesList = (state: State) => state.games.games;

export const selectIsLoadingGamesList = (state: State) => state.games.isLoading;
