import {
    ModalType,
    callModal,
    dangerousModalConfig,
} from '@src/components/callModal/call-modal';
import {showKanbanEditOrCreateTaskDialog} from '@src/components/dialogs/kanbanTaskEditOrCreateDialog/actions';
import {showMoveColumnTasksDialog} from '@src/components/dialogs/moveColumnTasksDialog/actions';
import {TaskFormType} from '@src/components/forms/kanbanEditOrCreateTaskForm/interfaces';
import {showNotification} from '@src/components/showNotification/show-notification';
import {
    deleteKanbanColumn,
    duplicateKanbanColumn,
    moveKanbanTask,
} from '@src/redux/kanban/actions';
import {selectKanbanColumns} from '@src/redux/kanban/selectors';
import {Button, Input} from 'antd';
import React, {useMemo} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import {KanbanColumn} from '../kanbanColumn/kanban-column';
import {KanbanEmptyColumn} from '../kanbanColumn/kanban-empty-column';
import styles from './styles.module.scss';

export const KanbanColumns = () => {
    const dispatch = useDispatch();

    const kanbanColumns = useSelector(selectKanbanColumns);

    const columnsListMemo = useMemo(
        () =>
            kanbanColumns.map((column) => (
                <KanbanColumn
                    column={column}
                    key={column._id}
                    addTask={() =>
                        dispatch(
                            showKanbanEditOrCreateTaskDialog({
                                type: TaskFormType.Create,
                                initialValue: {
                                    column: column._id,
                                },
                            }),
                        )
                    }
                    moveTasks={() => {
                        if (kanbanColumns.length < 2) {
                            showNotification(
                                'Нет доступной колонки для перемещения',
                            );
                        } else if (column.dealsCount < 1) {
                            showNotification('Нет задач для перемещения');
                        } else {
                            dispatch(
                                showMoveColumnTasksDialog({
                                    sourceColumn: column._id,
                                }),
                            );
                        }
                    }}
                    deleteTask={() =>
                        callModal({
                            modalType: ModalType.Confirm,
                            modalConfig: {
                                ...dangerousModalConfig.modalConfig,
                                content:
                                    'Вы действительно хотите удалить колонку',
                                okText: 'Удалить',
                                cancelText: 'Отмена',
                                onOk() {
                                    dispatch(deleteKanbanColumn(column._id));
                                },
                            },
                        })
                    }
                    duplicateTask={() =>
                        dispatch(duplicateKanbanColumn(column._id))
                    }
                />
            )),
        [kanbanColumns],
    );

    return (
        <div className={styles.kanbanColumns}>
            {Boolean(kanbanColumns.length) && (
                <DragDropContext
                    onDragEnd={(result) => {
                        if (!result.destination) {
                            return;
                        }

                        if (
                            result.destination.droppableId ===
                                result.source.droppableId &&
                            result.destination.index === result.source.index
                        ) {
                            return;
                        }

                        dispatch(moveKanbanTask(result));
                    }}
                >
                    {columnsListMemo}
                </DragDropContext>
            )}

            <KanbanEmptyColumn />
        </div>
    );
};
