import {APP_ROUTES} from '@src/constants';
import React, {lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {AppRouteElement} from '../appRouteElement/app-route-element';

const KanbanPage = lazy(() => import('@src/pages/KanbanPage/kanban-page'));

const UserSettingsPage = lazy(
    () => import('@src/pages/UserSettingsPage/user-settings-page'),
);

const EnvironmentSettingsPage = lazy(
    () =>
        import('@src/pages/EnvironmentSettingsPage/environment-settings-page'),
);

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
                path={APP_ROUTES.USER_SETTINGS}
                element={
                    <AppRouteElement
                        component={UserSettingsPage}
                        layout={MainLayout}
                    />
                }
            />

            <Route
                path={APP_ROUTES.ENVIRONMENT_SETTINGS}
                element={
                    <AppRouteElement
                        component={EnvironmentSettingsPage}
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
