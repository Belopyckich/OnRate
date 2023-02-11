import {State} from '@redux/reducers';

export const selectUser = (state: State) => state.user.user;

export const selectIsLoadingUser = (state: State) => state.user.isLoading;
