import {State} from '@redux/reducers';
import {createSelector} from 'reselect';

export const selectIsSidebarOpen = (state: State) => state.app.isSidebarOpen;

export const selectCurrentUser = (state: State) => state.app.user;

export const selectAccessToken = (state: State) => state.app.accessToken;

export const selectCurrentUserForSettings = createSelector(
    selectCurrentUser,
    (user) =>
        user
            ? {
                  ...user,
                  picture: {
                      src: user.picture?.medium,
                  },
              }
            : null,
);
