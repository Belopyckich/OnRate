import {State} from '@redux/reducers';
import {getUserSettingsFormValues} from '@src/components/forms/userSettingsForm/helpers';
import {createSelector} from 'reselect';

export const selectIsSidebarOpen = (state: State) => state.app.isSidebarOpen;

export const selectCurrentUser = (state: State) => state.app.user;

export const selectBackgrounds = (state: State) => state.app.userBackgrounds;

export const selectCurrentUserEnvironmentSettings = (state: State) =>
    state.app.userEnvironmentSettings;

export const selectCurrentUserBackground = (state: State) =>
    state.app.userEnvironmentSettings?.background;

export const selectAccessToken = (state: State) => state.app.accessToken;

export const selectCurrentUserForSettings = createSelector(
    selectCurrentUser,
    (user) => getUserSettingsFormValues(user),
);
