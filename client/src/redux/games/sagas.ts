import {all, put, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import * as actions from './actions';

function* getGamesListWorker() {
    const {data}: any = [];
    if (data) {
        yield put(actions.setGamesList(data));
    }
}

function* getGamesListWatcher() {
    yield takeLatest(getType(actions.getGamesList), getGamesListWorker);
}

export default function* GamesWatchers() {
    yield all([getGamesListWatcher()]);
}
