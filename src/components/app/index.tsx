import {APP_ROUTES} from '@src/constants';
import React, {lazy, useEffect, useState} from 'react';
import {Routes} from 'react-router-dom';

import {AppRoute} from '../appRoute/app-route';
import {MainContent} from '../main/main-component';

const AuthLayout = lazy(() => import('@src/layouts/auth-layout'));

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
        <AppRoute
            path={APP_ROUTES.ERROR}
            component={ErrorPage}
            layout={AuthLayout}
        />
    );
};
