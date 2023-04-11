import {ButtonWithIcon} from '@src/components/buttonWithIcon/button-with-icon';
import {showKanbanSettingsDialog} from '@src/components/dialogs/kanbanSettingsDialog/actions';
import {EmptyBlock} from '@src/components/emptyBlock/empty-block';
import {devLog} from '@src/helpers/dev-log';
import {selectKanbanColumns} from '@src/redux/kanban/selectors';
import {Button, Input} from 'antd';
import React, {useMemo} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

import {KanbanColumn} from '../kanbanColumn/kanban-column';
import styles from './styles.module.scss';

export const KanbanColumns = () => {
    const dispatch = useDispatch();

    const kanbanColumns = useSelector(selectKanbanColumns);
    console.log('🚀 ~ kanbanColumns:', kanbanColumns);

    const columnsListMemo = useMemo(
        () =>
            kanbanColumns.map((column) => (
                <KanbanColumn column={column} key={column._id} />
            )),
        [kanbanColumns],
    );

    return kanbanColumns.length ? (
        <div className={styles.kanbanColumns}>
            <DragDropContext onDragEnd={() => devLog('hello')}>
                {columnsListMemo}
            </DragDropContext>
        </div>
    ) : (
        <EmptyBlock
            description={
                <span className={styles.kanbanColumnsEmptyBlock}>
                    Нет доступных колонок. Вы можете добавить новые колонки в
                    настройках.
                    <Button
                        type="primary"
                        onClick={() => dispatch(showKanbanSettingsDialog())}
                    >
                        Добавить колонки
                    </Button>
                </span>
            }
        />
    );
};
