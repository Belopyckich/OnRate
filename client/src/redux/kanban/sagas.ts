import {messages} from '@src/constants/messages';
import {all, call, put, select, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import {requestHandler} from '../request-handler';
import * as actions from './actions';
import * as requests from './requests';
import {selectKanbanColumns} from './selectors';

function* createKanbanColumnWorker({
    payload: {title, color},
}: ReturnType<typeof actions.createKanbanColumn>) {
    const response = yield* requestHandler({
        request: call(requests.createKanbanColumnRequest, {
            title,
            color: JSON.stringify(color),
        }),
        successMessage: messages.kanbanCreateSuccess,
        errorMessage: messages.kanbanCreateError,
    });

    if (response?.data && response.success) {
        const columns = yield* select(selectKanbanColumns);

        yield* put(actions.setKanbanColumns([...columns, response.data]));
    }
}

function* createKanbanColumnWatcher() {
    yield takeLatest(
        getType(actions.createKanbanColumn),
        createKanbanColumnWorker,
    );
}

function* deleteKanbanColumnWorker({
    payload,
}: ReturnType<typeof actions.deleteKanbanColumn>) {
    const response = yield* requestHandler({
        request: call(requests.deleteKanbanColumnRequest, payload),
        successMessage: messages.kanbanDeleteSuccess,
        errorMessage: messages.kanbanDeleteError,
    });

    if (response?.success) {
        const columns = yield* select(selectKanbanColumns);

        yield* put(
            actions.setKanbanColumns(
                columns.filter((column) => column._id !== payload),
            ),
        );
    }
}

function* deleteKanbanColumnWatcher() {
    yield takeLatest(
        getType(actions.deleteKanbanColumn),
        deleteKanbanColumnWorker,
    );
}

function* getKanbanColumnsWorker() {
    const response = yield* requestHandler({
        request: call(requests.getKanbanColumnsRequest),
        errorMessage: messages.kanbanCreateError,
    });

    if (response?.data && response.success) {
        yield* put(actions.setKanbanColumns(response.data));
    }
}

function* getKanbanColumnWatcher() {
    yield takeLatest(getType(actions.getKanbanColumns), getKanbanColumnsWorker);
}

export default function* kanbanWatchers() {
    yield all([
        createKanbanColumnWatcher(),
        getKanbanColumnWatcher(),
        deleteKanbanColumnWatcher(),
    ]);
}
