import {ButtonWithIcon} from '@src/components/buttonWithIcon/button-with-icon';
import {TextOverflow} from '@src/components/textOverflow/text-overflow';
import {Task} from '@src/redux/kanban/interfaces';
import {selectKanbanColumns} from '@src/redux/kanban/selectors';
import {Input} from 'antd';
import React, {useMemo} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {useSelector} from 'react-redux';

import {KanbanColumn} from '../kanbanColumn/kanban-column';
import styles from './styles.module.scss';

export interface KanbanTaskProps {
    task: Task;
}

export const KanbanTask = ({task}: KanbanTaskProps) => {
    return (
        <div className={styles.kanbanTask}>
            <TextOverflow text={task.title} />

            <div className={styles.kanbanTaskText}>{task.text}</div>
        </div>
    );
};
