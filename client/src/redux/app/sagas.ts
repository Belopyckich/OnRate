import {UpdateUserProps} from '@src/components/forms/userSettingsForm/interfaces';
import {
    MessageType,
    showNotification,
} from '@src/components/showNotification/show-notification';
import {APP_ROUTES} from '@src/constants';
import {COOKIE_KEYS} from '@src/constants/cookie-keys';
import {DATE_FORMAT} from '@src/constants/date-formats';
import {messages} from '@src/constants/messages';
import Cookies from 'js-cookie';
import {all, call, put, select, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import {requestHandler} from '../request-handler';
import * as actions from './actions';
import {createUpdatedUserFormData} from './helpers';
import * as requests from './requests';
import {
    selectAccessToken,
    selectCurrentUserEnvironmentSettings,
} from './selectors';

function* loginUserWorker({payload}: ReturnType<typeof actions.loginUser>) {
    const response = yield* requestHandler({
        request: call(requests.loginRequest, payload),
        successMessage: messages.accessSuccess,
        errorMessage: messages.accessError,
    });

    if (response?.data && response.success) {
        const {user, refreshToken} = response.data;

        Cookies.set(COOKIE_KEYS.accessToken, refreshToken);

        yield* put(actions.setAccessToken(refreshToken));

        yield* put(
            actions.setUser({
                id: user.id,
                email: user.email,
                name: user.name,
                location: user.location,
                picture: user.picture,
                dob: user.dob,
            }),
        );

        yield* put(
            actions.setUserEnvironmentSettings({
                startPage: user.startPage,
                background: user.background,
            }),
        );

        yield* put(actions.getBackgrounds());
    }
}

function* loginUserWatcher() {
    yield takeLatest(getType(actions.loginUser), loginUserWorker);
}

function* updateUserWorker({
    payload: {user, callback},
}: ReturnType<typeof actions.updateUser>) {
    const response = yield* requestHandler({
        request: call(
            requests.updateUserRequest,
            createUpdatedUserFormData(user),
        ),
        successMessage: messages.updateUserSuccess,
        errorMessage: messages.updateUserError,
    });

    if (response?.data && response.success) {
        yield* put(actions.setUser(response.data));
        callback(response.data);
    }
}

function* updateUserWatcher() {
    yield takeLatest(getType(actions.updateUser), updateUserWorker);
}

function* setUserStartPageWorker({
    payload,
}: ReturnType<typeof actions.setUserStartPage>) {
    const response = yield* requestHandler({
        request: call(requests.setUserStartPageRequest, payload),
        successMessage: messages.updateUserSuccess,
        errorMessage: messages.updateUserError,
    });

    if (response?.data && response.success) {
        const environmentSettings = yield* select(
            selectCurrentUserEnvironmentSettings,
        );

        yield* put(
            actions.setUserEnvironmentSettings({
                ...environmentSettings,
                startPage: response.data,
            }),
        );
    }
}

function* setUserStartPageWatcher() {
    yield takeLatest(getType(actions.setUserStartPage), setUserStartPageWorker);
}

function* getBackgroundsWorker() {
    const response = yield* requestHandler({
        request: call(requests.getBackgroundsRequest),
        successMessage: messages.updateUserSuccess,
        errorMessage: messages.updateUserError,
    });

    if (response?.data && response.success) {
        yield* put(actions.setBackgrounds(response.data));
    }
}

function* getBackgroundsWatcher() {
    yield takeLatest(getType(actions.getBackgrounds), getBackgroundsWorker);
}

function* setUserBackgroundWorker({
    payload,
}: ReturnType<typeof actions.setUserBackground>) {
    const response = yield* requestHandler({
        request: call(requests.setUserBackgroundRequest, payload),
        successMessage: messages.updateBackgroundSuccess,
        errorMessage: messages.updateBackgroundError,
    });

    if (response?.success && typeof response.data === 'string') {
        const environmentSettings = yield* select(
            selectCurrentUserEnvironmentSettings,
        );

        yield* put(
            actions.setUserEnvironmentSettings({
                ...environmentSettings,
                background: response.data,
            }),
        );
    }
}

function* setUserBackgroundWatcher() {
    yield takeLatest(
        getType(actions.setUserBackground),
        setUserBackgroundWorker,
    );
}

function* checkAuthWorker({payload}: ReturnType<typeof actions.checkAuth>) {
    const response = yield* requestHandler({
        request: call(requests.checkAuthRequest),
        successMessage: messages.accessSuccess,
        errorMessage: messages.accessError,
    });

    if (response?.data && response.success) {
        const {user, refreshToken} = response.data;

        Cookies.set(COOKIE_KEYS.accessToken, refreshToken);
        payload.onCallback(user.startPage || APP_ROUTES.KANBAN);
        yield* put(actions.setAccessToken(refreshToken));

        yield* put(
            actions.setUser({
                id: user.id,
                email: user.email,
                name: user.name,
                location: user.location,
                picture: user.picture,
                dob: user.dob,
            }),
        );

        yield* put(
            actions.setUserEnvironmentSettings({
                startPage: user.startPage,
                background: user.background,
            }),
        );

        yield* put(actions.getBackgrounds());
    }
}

function* checkAuthWatcher() {
    yield takeLatest(getType(actions.checkAuth), checkAuthWorker);
}

function* logoutUserWorker() {
    const accessToken = yield* select(selectAccessToken);

    if (accessToken && typeof accessToken === 'string') {
        const response = yield* requestHandler({
            request: call(requests.logoutRequest, accessToken),
            successMessage: messages.logoutSuccess,
            errorMessage: messages.logoutError,
        });

        if (response?.success) {
            Cookies.remove(COOKIE_KEYS.accessToken);
            yield* put(actions.setAccessToken(null));
            yield* put(actions.setUser(null));
        }
    } else {
        showNotification(messages.logoutError, MessageType.Error);
    }
}

function* logoutUserWatcher() {
    yield takeLatest(getType(actions.logoutUser), logoutUserWorker);
}

function* registrateUserWorker({
    payload,
}: ReturnType<typeof actions.registrateUser>) {
    const response = yield* requestHandler({
        request: call(requests.registrateRequest, payload),
        successMessage: messages.registrateSuccess,
        errorMessage: messages.registrateError,
    });

    if (response?.data && response.success) {
        const {user, refreshToken} = response.data;

        Cookies.set(COOKIE_KEYS.accessToken, refreshToken);
        yield* put(actions.setAccessToken(refreshToken));

        yield* put(
            actions.setUser({
                id: user.id,
                email: user.email,
                name: user.name,
                location: user.location,
                picture: user.picture,
                dob: user.dob,
            }),
        );

        yield* put(
            actions.setUserEnvironmentSettings({
                startPage: user.startPage,
                background: user.background,
            }),
        );

        yield* put(actions.getBackgrounds());
    }
}

function* registrateUserWatcher() {
    yield takeLatest(getType(actions.registrateUser), registrateUserWorker);
}

export default function* appWatchers() {
    yield all([
        loginUserWatcher(),
        registrateUserWatcher(),
        logoutUserWatcher(),
        checkAuthWatcher(),
        updateUserWatcher(),
        setUserStartPageWatcher(),
        setUserBackgroundWatcher(),
        getBackgroundsWatcher(),
    ]);
}
