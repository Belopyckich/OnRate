import {EmptyBlock} from '@src/components/emptyBlock/empty-block';
import {TextOverflow} from '@src/components/textOverflow/text-overflow';
import {
    getOppositeTitleColor,
    getRgbStyleFromString,
} from '@src/helpers/perfect-colors';
import {KanbanColumnProps} from '@src/redux/kanban/interfaces';
import {
    selectKanbanBoardColumn,
    selectKanbanBoardDeals,
    selectKanbanColumns,
} from '@src/redux/kanban/selectors';
import {State} from '@src/redux/reducers';
import {Button, Spin} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {
    Draggable,
    DraggableProvided,
    Droppable,
    DroppableProvided,
} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';

import {KanbanTask} from '../KanbanTask/kanban-task';
import {sortKanbanColumnTasks} from './helpers';
import styles from './styles.module.scss';

export interface KanbanColumnData {
    column: KanbanColumnProps;
}

export const KanbanColumn = ({column}: KanbanColumnData) => {
    const {_id: columnUid, color: columnColor, title: columnTitle} = column;

    const tasksList = useSelector((state: State) =>
        selectKanbanBoardColumn(state, columnUid),
    );

    return (
        <div className={styles.kanbanColumn}>
            <div
                className={styles.kanbanColumnHeader}
                style={{backgroundColor: getRgbStyleFromString(columnColor)}}
            >
                <TextOverflow
                    text={columnTitle}
                    extraTextStyles={{
                        color: getOppositeTitleColor(columnColor),
                    }}
                />
            </div>

            <Droppable droppableId={columnUid}>
                {(provided: DroppableProvided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={styles.kanbanColumnContentWrap}
                    >
                        {tasksList?.tasks?.length ? (
                            <div className={styles.kanbanColumnContent}>
                                {sortKanbanColumnTasks(tasksList.tasks).map(
                                    (task, index) => (
                                        <Draggable
                                            draggableId={task._id}
                                            index={index}
                                            key={task._id}
                                        >
                                            {(
                                                providedDraggable: DraggableProvided,
                                            ) => (
                                                <div
                                                    ref={
                                                        providedDraggable.innerRef
                                                    }
                                                    {...providedDraggable.draggableProps}
                                                    {...providedDraggable.dragHandleProps}
                                                >
                                                    <KanbanTask
                                                        task={task}
                                                        key={task._id}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ),
                                )}
                            </div>
                        ) : (
                            <EmptyBlock />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};
