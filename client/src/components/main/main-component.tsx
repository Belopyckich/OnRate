import React, {lazy} from 'react';

import {ImageEditorDialog} from '../dialogs/imageEditorDialog/image-editor-dialog';
import {KanbanEditOrCreateColumnDialog} from '../dialogs/kanbanColumnEditOrCreateDialog/kanban-column-edit-or-create-dialog';
import {KanbanSettingsDialog} from '../dialogs/kanbanSettingsDialog/kanban-settings-dialog';
import {KanbanEditOrCreateTaskDialog} from '../dialogs/kanbanTaskEditOrCreateDialog/kanban-edit-or-create-dialog';
import {MoveColumnTasksDialog} from '../dialogs/moveColumnTasksDialog/move-column-tasks-dialog';

const MainRoutes = lazy(() => import('@src/components/routes/index'));

export const MainContent = React.memo(() => {
    return (
        <>
            <MainRoutes />
            <ImageEditorDialog />
            <KanbanSettingsDialog />
            <KanbanEditOrCreateColumnDialog />
            <KanbanEditOrCreateTaskDialog />
            <MoveColumnTasksDialog />
        </>
    );
});
