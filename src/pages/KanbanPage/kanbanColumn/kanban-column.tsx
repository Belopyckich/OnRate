import {EmptyBlock} from '@src/components/emptyBlock/empty-block';
import {TextOverflow} from '@src/components/textOverflow/text-overflow';
import {KanbanColumnProps} from '@src/redux/kanban/interfaces';
import {selectKanbanBoardColumnDeals} from '@src/redux/kanban/selectors';
import {State} from '@src/redux/reducers';
import {Button, Spin} from 'antd';
import React, {useCallback, useEffect, useState} from 'react';
import {Draggable, Droppable, DroppableProvided} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles.module.scss';

export interface KanbanColumnData {
    column: KanbanColumnProps;
}

export const KanbanColumn = ({column}: KanbanColumnData) => {
    const {uid: columnUid, color: columnColor, title: columnTitle} = column;

    const dealsList = useSelector((state: State) =>
        selectKanbanBoardColumnDeals(state, columnUid),
    );

    return (
        <div>
            <div>
                <div style={{borderColor: columnColor}}>
                    <div style={{backgroundColor: columnColor}} />
                    <TextOverflow text={columnTitle} />
                </div>
            </div>

            <Droppable droppableId={columnUid.toString()}>
                {(provided: DroppableProvided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {dealsList.length ? (
                            dealsList.map((item, index) => (
                                <div>{item.title}</div>
                            ))
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
