import {
    MessageType,
    showNotification,
} from '@src/components/showNotification/show-notification';
import {COOKIE_KEYS} from '@src/constants/cookie-keys';
import {messages} from '@src/constants/messages';
import Cookies from 'js-cookie';
import {all, call, put, select, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import {requestHandler} from '../request-handler';
import * as actions from './actions';
import * as requests from './requests';
import {selectAccessToken} from './selectors';

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
        yield* put(actions.setUser(user));
    }
}

function* loginUserWatcher() {
    yield takeLatest(getType(actions.loginUser), loginUserWorker);
}

function* checkAuthWorker() {
    const response = yield* requestHandler({
        request: call(requests.checkAuthRequest),
        successMessage: messages.accessSuccess,
        errorMessage: messages.accessError,
    });

    if (response?.data && response.success) {
        const {user, refreshToken} = response.data;

        Cookies.set(COOKIE_KEYS.accessToken, refreshToken);
        yield* put(actions.setAccessToken(refreshToken));
        yield* put(actions.setUser(user));
    }
}

function* checkAuthWatcher() {
    yield takeLatest(getType(actions.checkAuth), checkAuthWorker);
}

function* logoutUserWorker() {
    const accessToken = yield* select(selectAccessToken);
    console.log('🚀 ~ accessToken:', accessToken);

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
        yield* put(actions.setUser(user));
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
    ]);
}
