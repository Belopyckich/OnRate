import {KanbanDialog} from '@src/pages/KanbanPage/kanban-dialog';
import React, {lazy} from 'react';

import {ColorPickerDialog} from '../dialogs/colorPicker/color-picker-dialog';
import {ImageEditorDialog} from '../dialogs/imageEditorDialog/image-editor-dialog';
import {KanbanEditOrCreateColumnDialog} from '../dialogs/kanbanEditOrCreateDialog/kanban-edit-or-create-dialog';
import {KanbanSettingsDialog} from '../dialogs/kanbanSettingsDialog/kanban-settings-dialog';

const MainRoutes = lazy(() => import('@src/components/routes/index'));

export const MainContent = React.memo(() => {
    return (
        <>
            <MainRoutes />
            <KanbanDialog />
            <ImageEditorDialog />
            <KanbanSettingsDialog />
            <KanbanEditOrCreateColumnDialog />
        </>
    );
});
