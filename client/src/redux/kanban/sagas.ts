import {messages} from '@src/constants/messages';
import {editKanbanColumn} from '@src/redux/kanban/actions';
import {cloneDeep} from 'lodash';
import {all, call, put, select, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import {requestHandler} from '../request-handler';
import * as actions from './actions';
import {formatColumnsDataFromDb, reorderColumnList} from './helpers';
import * as requests from './requests';
import {selectKanbanColumns} from './selectors';

function* createKanbanColumnWorker({
    payload,
}: ReturnType<typeof actions.createKanbanColumn>) {
    const response = yield* requestHandler({
        request: call(requests.createKanbanColumnRequest, payload),
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

function* moveKanbanColumnWorker({
    payload,
}: ReturnType<typeof actions.moveKanbanColumn>) {
    if (!payload.destination) {
        return;
    }

    const kanbanColumns = yield* select(selectKanbanColumns);

    const oldKanbanColumns = cloneDeep(kanbanColumns);

    const newKanbanColumns = reorderColumnList(
        kanbanColumns,
        payload.source.index,
        payload.destination.index,
    );

    yield* put(actions.setKanbanColumns(newKanbanColumns));

    const response = yield* requestHandler({
        request: call(
            requests.moveKanbanColumnRequest,
            newKanbanColumns.map(({_id, position}) => ({
                _id,
                position,
            })),
        ),
        errorMessage: messages.kanbanMoveError,
    });

    yield* put(actions.setKanbanColumns(newKanbanColumns));

    if (!response?.success) {
        yield* put(actions.setKanbanColumns(oldKanbanColumns));
    }
}

function* moveKanbanColumnWatcher() {
    yield takeLatest(getType(actions.moveKanbanColumn), moveKanbanColumnWorker);
}

function* editKanbanColumnWorker({
    payload,
}: ReturnType<typeof actions.editKanbanColumn>) {
    const response = yield* requestHandler({
        request: call(requests.editKanbanColumnRequest, payload),
        successMessage: messages.kanbanUpdateSuccess,
        errorMessage: messages.kanbanUpdateError,
    });

    if (response?.data) {
        const columns = yield* select(selectKanbanColumns);

        const {data: updatedColumn} = response;

        yield* put(
            actions.setKanbanColumns(
                columns.map((column) =>
                    column._id === payload._id
                        ? formatColumnsDataFromDb(updatedColumn)
                        : column,
                ),
            ),
        );
    }
}

function* editKanbanColumnWatcher() {
    yield takeLatest(getType(actions.editKanbanColumn), editKanbanColumnWorker);
}

function* getKanbanColumnsWorker() {
    const response = yield* requestHandler({
        request: call(requests.getKanbanColumnsRequest),
        errorMessage: messages.kanbanCreateError,
    });

    if (response?.data && response.success) {
        yield* put(
            actions.setKanbanColumns(
                response.data.map((column) => formatColumnsDataFromDb(column)),
            ),
        );
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
        editKanbanColumnWatcher(),
        moveKanbanColumnWatcher(),
    ]);
}
