import 'react-image-crop/dist/ReactCrop.css';

import {KanbanEditOrCreateForm} from '@src/components/forms/kanbanEditOrCreateColumnForm/kanban-edit-or-create-column-form';
import {getRgbFromString} from '@src/helpers/perfect-colors';
import {deleteKanbanColumn} from '@src/redux/kanban/actions';
import {selectKanbanColumns} from '@src/redux/kanban/selectors';
import React, {useState} from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';

import {showKanbanEditOrCreateDialog} from '../../kanbanEditOrCreateDialog/actions';
import {KanbanColumnItem} from './kanbanItem/kanban-columns';
import styles from './styles.module.scss';

export const KanbanColumnsList = () => {
    const dispatch = useDispatch();

    const kanbanColumns = useSelector(selectKanbanColumns);

    return (
        <div className={styles.kanbanColumns}>
            <div className={styles.kanbanColumnsAvailable}>
                <div className={styles.kanbanColumnsAvailableTitle}>
                    Для изменения порядка отображения переместите колонку на
                    нужную позицию
                </div>

                <DragDropContext
                    onDragEnd={(result) => console.log(result, 'result')}
                >
                    <Droppable droppableId="columns">
                        {(dropableProvided) => (
                            <div
                                ref={dropableProvided.innerRef}
                                {...dropableProvided.droppableProps}
                                className={styles.kanbanColumnsAvailableContent}
                            >
                                {kanbanColumns.map((column) => (
                                    <KanbanColumnItem
                                        column={column}
                                        key={column._id}
                                        onEditClick={() =>
                                            dispatch(
                                                showKanbanEditOrCreateDialog({
                                                    initialValue: {
                                                        title: column.title,
                                                        color: getRgbFromString(
                                                            column.color,
                                                        ),
                                                    },
                                                }),
                                            )
                                        }
                                        onDeleteClick={() =>
                                            dispatch(
                                                deleteKanbanColumn(column._id),
                                            )
                                        }
                                    />
                                ))}
                                {dropableProvided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>

            <div className={styles.kanbanColumnsForm}>
                <KanbanEditOrCreateForm />
            </div>
        </div>
    );
};
