import {ButtonWithIcon} from '@src/components/buttonWithIcon/button-with-icon';
import {selectKanbanColumns} from '@src/redux/kanban/selectors';
import {Input} from 'antd';
import React, {useMemo} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {useSelector} from 'react-redux';

import {KanbanColumn} from '../kanbanColumn/kanban-column';
import styles from './styles.module.scss';

export const KanbanColumns = () => {
    const kanbanColumns = useSelector(selectKanbanColumns);

    const columnsListMemo = useMemo(
        () => kanbanColumns.map((column) => <KanbanColumn column={column} />),
        [kanbanColumns],
    );

    return (
        <div className={styles.kanbanColumns}>
            <DragDropContext onDragEnd={() => console.log('text')}>
                {columnsListMemo}
            </DragDropContext>
        </div>
    );
};
