import SettingsIcon from '@src/assets/settings.component.svg';
import {ButtonWithIcon} from '@src/components/buttonWithIcon/button-with-icon';
import {showKanbanSettingsDialog} from '@src/components/dialogs/kanbanSettingsDialog/actions';
import {selectAccessToken} from '@src/redux/app/selectors';
import {getKanbanColumns} from '@src/redux/kanban/actions';
import {Input} from 'antd';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {showKanbanDialog} from './kanban-dialog';
import {KanbanColumns} from './kanbanColumns/kanban-columns';
import styles from './styles.module.scss';

const KanbanPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getKanbanColumns());
    }, []);

    return (
        <div className={styles.kanbanPage}>
            <div className={styles.kanbanPageFilter}>
                <Input />
                <ButtonWithIcon
                    title="Добавить задачу"
                    onClick={() => dispatch(showKanbanDialog())}
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
