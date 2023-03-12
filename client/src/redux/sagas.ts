import {all} from 'typed-redux-saga';

import appSaga from './app/sagas';
import gamesSaga from './games/sagas';
import usersSaga from './randomUsers/sagas';

export default function* rootSaga() {
    yield all([gamesSaga(), usersSaga(), appSaga()]);
}
