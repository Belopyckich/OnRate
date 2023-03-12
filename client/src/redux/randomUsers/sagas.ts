import {all, call, put, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import {showNotification} from '../../components/showNotification/show-notification';
import * as actions from './actions';
import * as requests from './requests';

function* getUsersWorker() {
    try {
        const data = yield* call(requests.getUsersRequest);

        if (data.results?.length) {
            yield* put(actions.setUsers(data.results));
        } else {
            throw new Error();
        }
    } catch (e) {
        showNotification('Произошла ошибка при получении юзеров');
    }
}

function* getUsersWatcher() {
    yield takeLatest(getType(actions.getUsers), getUsersWorker);
}

export default function* usersWatchers() {
    yield all([getUsersWatcher()]);
}
