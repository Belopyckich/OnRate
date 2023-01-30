import {APP_ROUTES} from '@src/constants';
import React, {Suspense, lazy, useEffect, useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {AppRouteElement} from '../appRouteElement/app-route-element';
import {MainContent} from '../main/main-component';

const AuthLayout = lazy(() => import('@src/layouts/auth-layout'));

const AuthPage = lazy(() => import('@src/pages/MainPage/main-page'));

const ErrorPage = lazy(() => import('@src/pages/ErrorPage/error-page'));

export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoggedIn(true);
        }, 5000);
    }, []);

    return isLoggedIn ? (
        <MainContent />
    ) : (
        <Routes>
            <Route
                path={APP_ROUTES.AUTH}
                element={
                    <AppRouteElement layout={AuthLayout} component={AuthPage} />
                }
            />
            <Route
                path={APP_ROUTES.ERROR}
                element={
                    <AppRouteElement
                        layout={AuthLayout}
                        component={ErrorPage}
                    />
                }
            />
            <Route path="*" element={<Navigate to={APP_ROUTES.AUTH} />} />
        </Routes>
    );
};
