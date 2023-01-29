import {all} from 'typed-redux-saga';

import gamesSaga from './games/sagas';

export default function* rootSaga() {
    yield all([gamesSaga()]);
}
