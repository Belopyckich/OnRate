import {all, call, put, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import {showNotification} from '../../components/showNotification/show-notification';
import {User} from './../app/interfaces';
import * as actions from './actions';
import * as requests from './requests';

function* getUsersWorker() {
    try {
        const data = yield* call(requests.getUsersRequest);

        if (data.results?.length) {
            const users = data.results.map(
                (user) =>
                    ({
                        ...user,
                        name: `${user.name.first} ${user.name.last}`,
                        id: user.id.value,
                        dob: user.dob.date,
                    } as User),
            );

            yield* put(actions.setUsers(users));
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
