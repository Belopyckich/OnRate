import 'react-image-crop/dist/ReactCrop.css';

import {ConnectedDialog} from '@src/components/dialog/dialog';
import {Tabs} from 'antd';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import {
    KANBAN_SETTINGS_DIALOG_NAME,
    KANBAN_SETTINGS_DIALOG_WIDTH,
    KANBAN_SETTINGS_TAB_TITLE,
    KanbanSettingsTab,
} from './constants';
import {KanbanColumnsList} from './kanbanColumns/kanban-columns';
import styles from './styles.module.scss';

const {TabPane} = Tabs;

export const KanbanSettingsDialog = () => (
    <ConnectedDialog
        name={KANBAN_SETTINGS_DIALOG_NAME}
        wrapClassName={styles.kanbanSettingsDialog}
        DialogBody={KanbanSettingsDialogBody}
        destroyOnClose={true}
        maxWidth={KANBAN_SETTINGS_DIALOG_WIDTH}
    />
);

const KanbanSettingsDialogBody = () => {
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState(KanbanSettingsTab.KanbanColumns);

    return (
        <Tabs
            animated={true}
            onChange={(tabKey: KanbanSettingsTab) => setActiveTab(tabKey)}
            activeKey={activeTab}
        >
            <TabPane
                tab={KANBAN_SETTINGS_TAB_TITLE[KanbanSettingsTab.KanbanColumns]}
                key={KanbanSettingsTab.KanbanColumns}
            >
                <KanbanColumnsList />
            </TabPane>
        </Tabs>
    );
};
