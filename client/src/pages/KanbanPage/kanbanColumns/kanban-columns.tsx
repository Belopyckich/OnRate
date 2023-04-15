import {showKanbanEditOrCreateTaskDialog} from '@src/components/dialogs/kanbanTaskEditOrCreateDialog/actions';
import {TaskFormType} from '@src/components/forms/kanbanEditOrCreateTaskForm/interfaces';
import {moveKanbanTask} from '@src/redux/kanban/actions';
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
