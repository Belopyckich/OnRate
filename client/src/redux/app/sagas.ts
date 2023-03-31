import {LOCAL_STORAGE_KEYS} from '@src/constants/local-storage-keys';
import {messages} from '@src/constants/messages';
import {all, call, put, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import {setLocalStorageValue} from './../../helpers/localStorageManagement/local-storage-management';
import {requestHandler} from '../request-handler';
import * as actions from './actions';
import * as requests from './requests';

function* loginUserWorker({payload}: ReturnType<typeof actions.loginUser>) {
    const response = yield* requestHandler({
        request: call(requests.loginRequest, payload),
        successMessage: messages.accessSuccess,
        errorMessage: messages.accessError,
    });

    if (response?.data && response.success) {
        const {user, refreshToken, accessToken} = response.data;

        setLocalStorageValue(LOCAL_STORAGE_KEYS.accessToken, accessToken);
        setLocalStorageValue(LOCAL_STORAGE_KEYS.refreshToken, refreshToken);

        yield* put(actions.setUser(response.data.user));
    }
}

function* loginUserWatcher() {
    yield takeLatest(getType(actions.loginUser), loginUserWorker);
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
        const {user, refreshToken, accessToken} = response.data;

        setLocalStorageValue(LOCAL_STORAGE_KEYS.accessToken, accessToken);
        setLocalStorageValue(LOCAL_STORAGE_KEYS.refreshToken, refreshToken);

        yield* put(actions.setUser(user));
    }
}

function* registrateUserWatcher() {
    yield takeLatest(getType(actions.registrateUser), registrateUserWorker);
}

export default function* appWatchers() {
    yield all([loginUserWatcher(), registrateUserWatcher()]);
}
