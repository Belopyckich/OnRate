import SettingsIcon from '@src/assets/settings.component.svg';
import {ButtonWithIcon} from '@src/components/buttonWithIcon/button-with-icon';
import {Input} from 'antd';
import React from 'react';
import {useDispatch} from 'react-redux';

import {showKanbanDialog} from './kanban-dialog';
import {KanbanColumns} from './kanbanColumns/kanban-columns';
import styles from './styles.module.scss';

const KanbanPage = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.kanbanPage}>
            <div className={styles.kanbanPageFilter}>
                <Input />
                <ButtonWithIcon
                    title="Добавить задачу"
                    onClick={() => dispatch(showKanbanDialog())}
                />
                <ButtonWithIcon title="Настройка" component={SettingsIcon} />
            </div>

            <KanbanColumns />
        </div>
    );
};

export default KanbanPage;
