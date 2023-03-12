import {State} from '@redux/reducers';

export const selectIsLoadingUser = (state: State) => state.users.isLoading;

export const selectUsers = (state: State) => state.users.users;
