import 'react-image-crop/dist/ReactCrop.css';

import {ColumnFormType} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import {KanbanEditOrCreateColumnForm} from '@src/components/forms/kanbanEditOrCreateColumnForm/kanban-edit-or-create-column-form';
import {deleteKanbanColumn, moveKanbanColumn} from '@src/redux/kanban/actions';
import {KanbanColumnProps} from '@src/redux/kanban/interfaces';
import {selectKanbanColumns} from '@src/redux/kanban/selectors';
import React, {useState} from 'react';
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    DropResult,
    Droppable,
} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';

import {showKanbanEditOrCreateDialog} from '../../kanbanColumnEditOrCreateDialog/actions';
import {KanbanColumnItem} from './kanbanItem/kanban-columns';
import styles from './styles.module.scss';

export const KanbanColumnsList = () => {
    const dispatch = useDispatch();

    const kanbanColumns = useSelector(selectKanbanColumns);
    console.log('🚀 ~ kanbanColumns:', kanbanColumns);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        dispatch(moveKanbanColumn(result));
    };

    return (
        <div className={styles.kanbanColumns}>
            <div className={styles.kanbanColumnsAvailable}>
                <div className={styles.kanbanColumnsAvailableTitle}>
                    Для изменения порядка отображения переместите колонку на
                    нужную позицию
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="columns">
                        {(dropableProvided) => (
                            <div
                                ref={dropableProvided.innerRef}
                                {...dropableProvided.droppableProps}
                                className={styles.kanbanColumnsAvailableContent}
                            >
                                {kanbanColumns.map((column, index) => (
                                    <Draggable
                                        draggableId={column._id}
                                        index={index}
                                        key={column._id}
                                    >
                                        {(
                                            providedDraggable: DraggableProvided,
                                        ) => (
                                            <div
                                                ref={providedDraggable.innerRef}
                                                {...providedDraggable.draggableProps}
                                                {...providedDraggable.dragHandleProps}
                                            >
                                                <KanbanColumnItem
                                                    column={column}
                                                    key={column._id}
                                                    onEditClick={() =>
                                                        dispatch(
                                                            showKanbanEditOrCreateDialog(
                                                                {
                                                                    type: ColumnFormType.Edit,
                                                                    _id: column._id,
                                                                    initialValue:
                                                                        {
                                                                            title: column.title,
                                                                            color: column.color,
                                                                        },
                                                                },
                                                            ),
                                                        )
                                                    }
                                                    onDeleteClick={() =>
                                                        dispatch(
                                                            deleteKanbanColumn(
                                                                column._id,
                                                            ),
                                                        )
                                                    }
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {dropableProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <div className={styles.kanbanColumnsForm}>
                <KanbanEditOrCreateColumnForm type={ColumnFormType.Create} />
            </div>
        </div>
    );
};
