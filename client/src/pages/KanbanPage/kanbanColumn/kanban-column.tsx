import {EmptyBlock} from '@src/components/emptyBlock/empty-block';
import {TextOverflow} from '@src/components/textOverflow/text-overflow';
import {getOppositeTitleColor} from '@src/helpers/perfect-colors';
import {KanbanColumnProps} from '@src/redux/kanban/interfaces';
import {selectKanbanBoardColumnDeals} from '@src/redux/kanban/selectors';
import {State} from '@src/redux/reducers';
import {Button, Spin} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {Draggable, Droppable, DroppableProvided} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';

import {KanbanTask} from '../KanbanTask/kanban-task';
import styles from './styles.module.scss';

export interface KanbanColumnData {
    column: KanbanColumnProps;
}

export const KanbanColumn = ({column}: KanbanColumnData) => {
    const {uid: columnUid, color: columnColor, title: columnTitle} = column;

    const tasksList = useSelector((state: State) =>
        selectKanbanBoardColumnDeals(state, columnUid),
    );

    return (
        <div className={styles.kanbanColumn}>
            <div
                className={styles.kanbanColumnHeader}
                style={{backgroundColor: columnColor}}
            >
                <TextOverflow
                    text={columnTitle}
                    extraTextStyles={{
                        color: getOppositeTitleColor(columnColor),
                    }}
                />
            </div>

            <Droppable droppableId={columnUid.toString()}>
                {(provided: DroppableProvided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={styles.kanbanColumnContentWrap}
                    >
                        {tasksList.length ? (
                            <div className={styles.kanbanColumnContent}>
                                {tasksList.map((task, index) => (
                                    <KanbanTask task={task} />
                                ))}
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
