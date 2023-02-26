import {State} from '@redux/reducers';

export const selectCurrentUser = (state: State) => state.users.currentUser;

export const selectIsLoadingUser = (state: State) => state.users.isLoading;

export const selectUsers = (state: State) => state.users.users;
