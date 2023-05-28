import {
    MessageType,
    showNotification,
} from '@src/components/showNotification/show-notification';
import {messages} from '@src/constants/messages';
import {editKanbanColumn} from '@src/redux/kanban/actions';
import {cloneDeep} from 'lodash';
import {all, call, put, select, takeEvery, takeLatest} from 'typed-redux-saga';
import {getType} from 'typesafe-actions';

import {requestHandler} from '../request-handler';
import * as actions from './actions';
import {
    formatColumnsDataFromDb,
    reorderColumnList,
    reorderTasksInColumns,
} from './helpers';
import * as requests from './requests';
import {selectKanbanBoardColumn, selectKanbanColumns} from './selectors';

function* createKanbanColumnWorker({
    payload,
}: ReturnType<typeof actions.createKanbanColumn>) {
    const response = yield* requestHandler({
        request: call(requests.createKanbanColumnRequest, payload),
        successMessage: messages.kanbanColumnCreateSuccess,
        errorMessage: messages.kanbanColumnCreateError,
    });

    if (response?.data && response.success) {
        const columns = yield* select(selectKanbanColumns);

        yield* put(actions.setKanbanColumns([...columns, response.data]));

        yield* put(
            actions.setKanbanBoardColumn({
                column_uid: response.data._id,
                data: {
                    tasks: [],
                    isLoading: false,
                },
            }),
        );
    }
}

function* createKanbanColumnWatcher() {
    yield takeLatest(
        getType(actions.createKanbanColumn),
        createKanbanColumnWorker,
    );
}

function* createKanbanTaskWorker({
    payload,
}: ReturnType<typeof actions.createKanbanTask>) {
    const kanbanColumn = yield* select((state) =>
        selectKanbanBoardColumn(state, payload.column),
    );

    if (!kanbanColumn) {
        return showNotification(messages.kanbanColumnError, MessageType.Error);
    }

    yield* put(
        actions.setKanbanBoardColumn({
            column_uid: payload.column,
            data: {
                ...kanbanColumn,
                isLoading: true,
            },
        }),
    );

    const response = yield* requestHandler({
        request: call(requests.createKanbanTaskRequest, payload),
        successMessage: messages.kanbanTaskCreateSuccess,
        errorMessage: messages.kanbanTaskCreateError,
        errorAction: actions.setKanbanBoardColumn({
            column_uid: payload.column,
            data: {
                ...kanbanColumn,
                isLoading: false,
            },
        }),
    });

    if (response?.data && response.success) {
        yield* put(
            actions.setKanbanBoardColumn({
                column_uid: response.data.column,
                data: {
                    ...kanbanColumn,
                    tasks: [...kanbanColumn.tasks, response.data],
                    isLoading: false,
                },
            }),
        );

        const columns = yield* select(selectKanbanColumns);

        yield* put(
            actions.setKanbanColumns(
                columns.map((column) =>
                    payload.column === column._id
                        ? {...column, dealsCount: column.dealsCount + 1}
                        : column,
                ),
            ),
        );
    }
}

function* createKanbanTaskWatcher() {
    yield takeLatest(getType(actions.createKanbanTask), createKanbanTaskWorker);
}

function* deleteKanbanTaskWorker({
    payload,
}: ReturnType<typeof actions.deleteKanbanTask>) {
    const kanbanColumn = yield* select((state) =>
        selectKanbanBoardColumn(state, payload.column),
    );

    if (!kanbanColumn) {
        return showNotification(messages.kanbanColumnError, MessageType.Error);
    }

    yield* put(
        actions.setKanbanBoardColumn({
            column_uid: payload.column,
            data: {
                ...kanbanColumn,
                isLoading: true,
            },
        }),
    );

    const response = yield* requestHandler({
        request: call(requests.deleteKanbanTaskRequest, payload),
        successMessage: messages.kanbanTaskDeleteSuccess,
        errorMessage: messages.kanbanTaskDeleteError,
        errorAction: actions.setKanbanBoardColumn({
            column_uid: payload.column,
            data: {
                ...kanbanColumn,
                isLoading: false,
            },
        }),
    });

    if (response?.data && response.success) {
        yield* put(
            actions.setKanbanBoardColumn({
                column_uid: payload.column,
                data: {
                    ...kanbanColumn,
                    tasks: response.data,
                    isLoading: false,
                },
            }),
        );

        const columns = yield* select(selectKanbanColumns);

        yield* put(
            actions.setKanbanColumns(
                columns.map((column) =>
                    payload.column === column._id
                        ? {...column, dealsCount: column.dealsCount - 1}
                        : column,
                ),
            ),
        );
    }
}

function* deleteKanbanTaskWatcher() {
    yield takeLatest(getType(actions.deleteKanbanTask), deleteKanbanTaskWorker);
}

function* editKanbanTaskWorker({
    payload: {oldColumn, ...newData},
}: ReturnType<typeof actions.editKanbanTask>) {
    const oldKanbanColumn = yield* select((state) =>
        selectKanbanBoardColumn(state, oldColumn),
    );

    const newKanbanColumn = yield* select((state) =>
        selectKanbanBoardColumn(state, newData.column),
    );

    if (!oldKanbanColumn || !newKanbanColumn) {
        return showNotification(messages.kanbanColumnError, MessageType.Error);
    }

    const isTaskColumnChanged = newData.column !== oldColumn;

    const response = yield* requestHandler({
        request: call(
            requests.editKanbanTaskRequest,
            isTaskColumnChanged
                ? {...newData, position: newKanbanColumn.tasks.length}
                : newData,
        ),
        successMessage: messages.kanbanTaskUpdateSuccess,
        errorMessage: messages.kanbanTaskUpdateError,
    });

    if (response?.data && response.success) {
        const updatedTask = response.data;

        if (isTaskColumnChanged) {
            yield* put(
                actions.setKanbanBoardColumn({
                    column_uid: oldColumn,
                    data: {
                        ...oldKanbanColumn,
                        tasks: oldKanbanColumn.tasks
                            .filter((task) => task._id !== newData._id)
                            .map((task, index) => ({
                                ...task,
                                position: index,
                            })),
                        isLoading: false,
                    },
                }),
            );

            yield* put(
                actions.setKanbanBoardColumn({
                    column_uid: updatedTask.column,
                    data: {
                        ...newKanbanColumn,
                        tasks: [...newKanbanColumn.tasks, updatedTask].map(
                            (task, index) => ({
                                ...task,
                                position: index,
                            }),
                        ),
                        isLoading: false,
                    },
                }),
            );

            const columns = yield* select(selectKanbanColumns);

            yield* put(
                actions.setKanbanColumns(
                    columns.map((column) => {
                        if (column._id === oldColumn) {
                            return {
                                ...column,
                                dealsCount: column.dealsCount - 1,
                            };
                        }

                        if (column._id === updatedTask.column) {
                            return {
                                ...column,
                                dealsCount: column.dealsCount + 1,
                            };
                        }

                        return column;
                    }),
                ),
            );
        } else {
            yield* put(
                actions.setKanbanBoardColumn({
                    column_uid: updatedTask.column,
                    data: {
                        ...newKanbanColumn,
                        tasks: newKanbanColumn.tasks
                            .map((task) =>
                                task._id === newData._id ? updatedTask : task,
                            )
                            .map((task, index) => ({
                                ...task,
                                position: index,
                            })),
                        isLoading: false,
                    },
                }),
            );
        }
    }
}

function* editKanbanEditWatcher() {
    yield takeLatest(getType(actions.editKanbanTask), editKanbanTaskWorker);
}

function* moveKanbanTaskWorker({
    payload,
}: ReturnType<typeof actions.moveKanbanTask>) {
    const {destination, source} = payload;

    if (!destination) {
        return;
    }

    const sourceKanbanColumn = yield* select((state) =>
        selectKanbanBoardColumn(state, source.droppableId),
    );

    const destinationKanbanColumn = yield* select((state) =>
        selectKanbanBoardColumn(state, destination.droppableId),
    );

    if (!sourceKanbanColumn || !destinationKanbanColumn) {
        return showNotification(messages.kanbanColumnError, MessageType.Error);
    }

    const oldKanbanSourceColumn = cloneDeep(sourceKanbanColumn);
    const oldKanbanDestinationColumn = cloneDeep(destinationKanbanColumn);

    const isTaskColumnChanged = source.droppableId !== destination.droppableId;

    const {newSourceColumnTasks, newDestinationColumnTasks} =
        reorderTasksInColumns(
            oldKanbanSourceColumn.tasks,
            oldKanbanDestinationColumn.tasks,
            source,
            destination,
        );

    if (isTaskColumnChanged) {
        yield* put(
            actions.setKanbanBoardColumn({
                column_uid: destination.droppableId,
                data: {
                    ...destinationKanbanColumn,
                    tasks: newDestinationColumnTasks,
                    isLoading: false,
                },
            }),
        );
    }

    yield* put(
        actions.setKanbanBoardColumn({
            column_uid: source.droppableId,
            data: {
                ...sourceKanbanColumn,
                tasks: newSourceColumnTasks,
                isLoading: false,
            },
        }),
    );

    const response = yield* requestHandler({
        request: call(requests.moveKanbanTaskRequest, payload),
        errorMessage: messages.kanbanTaskMoveError,
    });

    if (response?.success) {
        const columns = yield* select(selectKanbanColumns);

        if (isTaskColumnChanged) {
            yield* put(
                actions.setKanbanColumns(
                    columns.map((column) => {
                        if (column._id === source.droppableId) {
                            return {
                                ...column,
                                dealsCount: column.dealsCount - 1,
                            };
                        }

                        if (column._id === destination.droppableId) {
                            return {
                                ...column,
                                dealsCount: column.dealsCount + 1,
                            };
                        }

                        return column;
                    }),
                ),
            );
        }
    } else {
        yield* put(
            actions.setKanbanBoardColumn({
                column_uid: source.droppableId,
                data: {
                    ...sourceKanbanColumn,
                    tasks: oldKanbanSourceColumn.tasks,
                    isLoading: false,
                },
            }),
        );

        yield* put(
            actions.setKanbanBoardColumn({
                column_uid: destination.droppableId,
                data: {
                    ...destinationKanbanColumn,
                    tasks: oldKanbanDestinationColumn.tasks,
                    isLoading: false,
                },
            }),
        );
    }
}

function* moveKanbanTaskWatcher() {
    yield takeLatest(getType(actions.moveKanbanTask), moveKanbanTaskWorker);
}

function* deleteKanbanColumnWorker({
    payload,
}: ReturnType<typeof actions.deleteKanbanColumn>) {
    const response = yield* requestHandler({
        request: call(requests.deleteKanbanColumnRequest, payload),
        successMessage: messages.kanbanColumnDeleteSuccess,
        errorMessage: messages.kanbanColumnDeleteError,
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
        errorMessage: messages.kanbanColumnMoveError,
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
        successMessage: messages.kanbanColumnUpdateSuccess,
        errorMessage: messages.kanbanColumnUpdateError,
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

function* duplicateKanbanColumnWorker({
    payload,
}: ReturnType<typeof actions.duplicateKanbanColumn>) {
    const response = yield* requestHandler({
        request: call(requests.duplicateKanbanColumnRequest, payload),
        successMessage: messages.kanbanColumnDuplicateSuccess,
        errorMessage: messages.kanbanColumnDuplicateError,
    });

    if (response?.data) {
        const columns = yield* select(selectKanbanColumns);

        yield* put(
            actions.setKanbanColumns([
                ...columns,
                formatColumnsDataFromDb(response.data),
            ]),
        );

        yield* put(actions.getKanbanTasksByColumn(response.data._id));
    }
}

function* duplicateKanbanColumnWatcher() {
    yield takeLatest(
        getType(actions.duplicateKanbanColumn),
        duplicateKanbanColumnWorker,
    );
}

function* moveColumnTasksWorker({
    payload,
}: ReturnType<typeof actions.moveColumnTasks>) {
    const response = yield* requestHandler({
        request: call(requests.moveColumnTasksRequest, payload),
        successMessage: messages.kanbanColumnTasksMovedSuccess,
        errorMessage: messages.kanbanColumnTasksMovedError,
    });

    if (response?.success && response.data) {
        yield* put(
            actions.setKanbanBoardColumn({
                column_uid: payload.sourceColumn,
                data: {
                    tasks: [],
                    isLoading: false,
                },
            }),
        );

        yield put(actions.getKanbanTasksByColumn(payload.destinationColumn));
    }
}

function* moveColumnTasksWatcher() {
    yield takeLatest(getType(actions.moveColumnTasks), moveColumnTasksWorker);
}

function* getKanbanColumnsWorker() {
    const response = yield* requestHandler({
        request: call(requests.getKanbanColumnsRequest),
        errorMessage: messages.kanbanColumnCreateError,
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

function* getKanbanBoardColumnsWorker() {
    yield put(actions.setKanbanIsLoading(true));

    const response = yield* requestHandler({
        request: call(requests.getKanbanColumnsRequest),
        errorMessage: messages.kanbanColumnCreateError,
    });

    if (response?.data && response.success) {
        const columns = response.data.map((column) =>
            formatColumnsDataFromDb(column),
        );

        yield* put(actions.setKanbanColumns(columns));

        yield* columns.map((column) =>
            put(actions.getKanbanTasksByColumn(column._id)),
        );
    }

    yield* put(actions.setKanbanIsLoading(false));
}

function* getKanbanBoardColumnsWatcher() {
    yield takeLatest(
        getType(actions.getKanbanBoardColumns),
        getKanbanBoardColumnsWorker,
    );
}

function* getKanbanTasksByColumnWorker({
    payload,
}: ReturnType<typeof actions.getKanbanTasksByColumn>) {
    yield* put(
        actions.setKanbanBoardColumn({
            column_uid: payload,
            data: {
                isLoading: true,
            },
        }),
    );

    const response = yield* requestHandler({
        request: call(requests.getKanbanTasksByColumnRequest, payload),
        errorMessage: messages.kanbanColumnCreateError,
        errorAction: actions.setKanbanBoardColumn({
            column_uid: payload,
            data: {
                tasks: [],
                isLoading: false,
            },
        }),
    });

    if (response?.data && response.success) {
        yield* put(
            actions.setKanbanBoardColumn({
                column_uid: payload,
                data: {
                    tasks: response.data,
                    isLoading: false,
                },
            }),
        );
    }
}

function* getKanbanTasksByColumnWatcher() {
    yield takeEvery(
        getType(actions.getKanbanTasksByColumn),
        getKanbanTasksByColumnWorker,
    );
}

export default function* kanbanWatchers() {
    yield all([
        createKanbanColumnWatcher(),
        getKanbanColumnWatcher(),
        deleteKanbanColumnWatcher(),
        editKanbanColumnWatcher(),
        moveKanbanColumnWatcher(),
        createKanbanTaskWatcher(),
        editKanbanEditWatcher(),
        deleteKanbanTaskWatcher(),
        getKanbanBoardColumnsWatcher(),
        getKanbanTasksByColumnWatcher(),
        moveKanbanTaskWatcher(),
        duplicateKanbanColumnWatcher(),
        moveColumnTasksWatcher(),
    ]);
}
