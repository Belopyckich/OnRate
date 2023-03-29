import {messages} from '@src/constants/messages';
import {all, call, put, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import {requestHandler} from '../request-handler';
import * as actions from './actions';
import * as requests from './requests';

function* loginUserWorker({payload}: ReturnType<typeof actions.loginUser>) {
    const data = yield* requestHandler({
        request: call(requests.loginRequest, payload),
        successMessage: messages.accessSuccess,
        errorMessage: messages.accessError,
    });

    if (data) {
        yield* put(actions.setUser(data));
    }
}

function* loginUserWatcher() {
    yield takeLatest(getType(actions.loginUser), loginUserWorker);
}

function* registrateUserWorker({
    payload,
}: ReturnType<typeof actions.registrateUser>) {
    const data = yield* requestHandler({
        request: call(requests.registrateRequest, payload),
        successMessage: messages.registrateSuccess,
        errorMessage: messages.registrateError,
    });

    if (data) {
        yield* put(actions.setUser(data));
    }
}

function* registrateUserWatcher() {
    yield takeLatest(getType(actions.registrateUser), registrateUserWorker);
}

export default function* appWatchers() {
    yield all([loginUserWatcher(), registrateUserWatcher()]);
}
