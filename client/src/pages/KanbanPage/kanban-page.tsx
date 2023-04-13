import SettingsIcon from '@src/assets/settings.component.svg';
import {ButtonWithIcon} from '@src/components/buttonWithIcon/button-with-icon';
import {showKanbanSettingsDialog} from '@src/components/dialogs/kanbanSettingsDialog/actions';
import {showKanbanEditOrCreateTaskDialog} from '@src/components/dialogs/kanbanTaskEditOrCreateDialog/actions';
import {ColumnFormType} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import {selectAccessToken} from '@src/redux/app/selectors';
import {
    getKanbanBoardColumns,
    getKanbanColumns,
} from '@src/redux/kanban/actions';
import {Input} from 'antd';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {KanbanColumns} from './kanbanColumns/kanban-columns';
import styles from './styles.module.scss';

const KanbanPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getKanbanBoardColumns());
    }, []);

    return (
        <div className={styles.kanbanPage}>
            <div className={styles.kanbanPageFilter}>
                <Input />
                <ButtonWithIcon
                    title="Добавить задачу"
                    onClick={() =>
                        dispatch(
                            showKanbanEditOrCreateTaskDialog({
                                type: ColumnFormType.Create,
                            }),
                        )
                    }
                />
                <ButtonWithIcon
                    title="Настройка"
                    component={SettingsIcon}
                    onClick={() => dispatch(showKanbanSettingsDialog())}
                />
            </div>

            <KanbanColumns />
        </div>
    );
};

export default KanbanPage;
