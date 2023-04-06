import {KanbanDialog} from '@src/pages/KanbanPage/kanban-dialog';
import React, {lazy} from 'react';

import {ImageEditorDialog} from '../dialogs/imageEditorDialog/image-editor-dialog';

const MainRoutes = lazy(() => import('@src/components/routes/index'));

export const MainContent = React.memo(() => {
    return (
        <>
            <MainRoutes />
            <KanbanDialog />
            <ImageEditorDialog />
        </>
    );
});
