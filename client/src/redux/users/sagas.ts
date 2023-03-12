import {all, call, put, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import {showNotification} from './../../components/showNotification/show-notification';
import * as actions from './actions';
import {User} from './interfaces';
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

function* loginCurrentUserWorker({
    payload,
}: ReturnType<typeof actions.loginCurrentUser>) {
    try {
        const user = {
            gender: 'female',
            name: {
                title: 'Miss',
                first: 'Jennie',
                last: 'Nichols',
            },
            location: {
                street: {
                    number: 8929,
                    name: 'Valwood Pkwy',
                },
                city: 'Billings',
                state: 'Michigan',
                country: 'United States',
                postcode: '63104',
                coordinates: {
                    latitude: '-69.8246',
                    longitude: '134.8719',
                },
                timezone: {
                    offset: '+9:30',
                    description: 'Adelaide, Darwin',
                },
            },
            email: 'jennie.nichols@example.com',
            dob: {
                date: '1992-03-08T15:13:16.688Z',
                age: 30,
            },
            phone: '(272) 790-0888',
            picture: {
                large: 'https://randomuser.me/api/portraits/men/75.jpg',
                medium: 'https://randomuser.me/api/portraits/med/men/75.jpg',
                thumbnail:
                    'https://randomuser.me/api/portraits/thumb/men/75.jpg',
            },
            nat: 'US',
        } as User;

        if (payload) {
            yield* put(actions.setCurrentUser(user));
        } else {
            throw new Error();
        }
    } catch (e) {
        showNotification('Произошла ошибка при получении юзеров');
    }
}

function* loginCurrentUserWatcher() {
    yield takeLatest(getType(actions.loginCurrentUser), loginCurrentUserWorker);
}

export default function* usersWatchers() {
    yield all([getUsersWatcher(), loginCurrentUserWatcher()]);
}
