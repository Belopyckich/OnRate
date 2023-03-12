import SettingsIcon from '@src/assets/settings-icon.component.svg';
import {ButtonWithIcon} from '@src/components/buttonWithIcon/button-with-icon';
import {Input} from 'antd';
import React from 'react';

import {KanbanColumns} from './kanbanColumns/kanban-columns';
import styles from './styles.module.scss';

const KanbanPage = () => {
    return (
        <div className={styles.kanbanPage}>
            <div className={styles.kanbanPageFilter}>
                <Input />
                <ButtonWithIcon title="Добавить задачу" />
                <ButtonWithIcon title="Настройка" component={SettingsIcon} />
            </div>

            <KanbanColumns />
        </div>
    );
};

export default KanbanPage;
