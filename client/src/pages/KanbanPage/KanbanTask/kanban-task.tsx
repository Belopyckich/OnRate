import {ButtonWithIcon} from '@src/components/buttonWithIcon/button-with-icon';
import {showKanbanEditOrCreateTaskDialog} from '@src/components/dialogs/kanbanTaskEditOrCreateDialog/actions';
import {ColumnFormType} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import {TextOverflow} from '@src/components/textOverflow/text-overflow';
import {deleteKanbanTask, editKanbanTask} from '@src/redux/kanban/actions';
import {KanbanTaskProps} from '@src/redux/kanban/interfaces';
import {selectKanbanColumns} from '@src/redux/kanban/selectors';
import {Button, Input} from 'antd';
import React, {useMemo} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import {KanbanColumn} from '../kanbanColumn/kanban-column';
import styles from './styles.module.scss';

export interface KanbanTaskElementProps {
    task: KanbanTaskProps;
}

export const KanbanTask = ({task}: KanbanTaskElementProps) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.kanbanTask}>
            <TextOverflow text={task.title} />

            <div className={styles.kanbanTaskText}>{task.description}</div>

            <div className={styles.kanbanTaskText}>
                Position:{task.position}
            </div>

            <Button onClick={() => dispatch(deleteKanbanTask(task))}>
                удалить
            </Button>

            <Button
                onClick={() =>
                    dispatch(
                        showKanbanEditOrCreateTaskDialog({
                            type: ColumnFormType.Edit,
                            _id: task._id,
                            initialValue: task,
                        }),
                    )
                }
            >
                изменить
            </Button>
        </div>
    );
};
