import {APP_ROUTES} from '@src/constants';
import {KanbanDialog} from '@src/pages/KanbanPage/kanban-dialog';
import React, {lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {AppRouteElement} from '../appRouteElement/app-route-element';

const KanbanPage = lazy(() => import('@src/pages/KanbanPage/kanban-page'));

const MainLayout = lazy(() => import('@src/layouts/main-layout'));

const ErrorPage = lazy(() => import('@src/pages/ErrorPage/error-page'));

const MainRoutes = () => {
    return (
        <Routes>
            <Route
                path={APP_ROUTES.KANBAN}
                element={
                    <AppRouteElement
                        component={KanbanPage}
                        layout={MainLayout}
                    />
                }
            />

            <Route
                path={APP_ROUTES.ERROR}
                element={
                    <AppRouteElement
                        layout={MainLayout}
                        component={ErrorPage}
                    />
                }
            />

            <Route path="*" element={<Navigate to={APP_ROUTES.KANBAN} />} />
        </Routes>
    );
};

export default MainRoutes;
