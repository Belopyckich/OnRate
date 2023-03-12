import {messages} from '@src/constants/messages';
import {all, call, put, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import {requestHandler} from '../request-handler';
import * as actions from './actions';
import * as requests from './requests';

function* loginWorker({payload}: ReturnType<typeof actions.loginUser>) {
    const data = yield* requestHandler({
        request: call(requests.loginRequest, payload),
        successMessage: messages.accessSuccess,
        errorMessage: messages.accessError,
    });

    if (data) {
        yield* put(actions.setUser(data));
    }
}

function* loginWatcher() {
    yield takeLatest(getType(actions.loginUser), loginWorker);
}

export default function* appWatchers() {
    yield all([loginWatcher()]);
}
