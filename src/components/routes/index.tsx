import {APP_ROUTES} from '@src/constants';
import React, {lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {AppRouteElement} from '../appRouteElement/app-route-element';

const MainPage = lazy(() => import('@src/pages/MainPage/main-page'));

const MainLayout = lazy(() => import('@src/layouts/main-layout'));

const ErrorPage = lazy(() => import('@src/pages/ErrorPage/error-page'));

const MainRoutes = () => {
    console.log('mainLayout');

    return (
        <Routes>
            <Route
                path={APP_ROUTES.MAIN}
                element={
                    <AppRouteElement component={MainPage} layout={MainLayout} />
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

            <Route path="*" element={<Navigate to={APP_ROUTES.MAIN} />} />
        </Routes>
    );
};

export default MainRoutes;
