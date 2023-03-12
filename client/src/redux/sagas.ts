import {all} from 'typed-redux-saga';

import gamesSaga from './games/sagas';
import usersSaga from './users/sagas';

export default function* rootSaga() {
    yield all([gamesSaga(), usersSaga()]);
}
