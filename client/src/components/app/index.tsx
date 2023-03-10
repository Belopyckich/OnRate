import {APP_ROUTES} from '@src/constants';
import React, {lazy, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Navigate, Route, Routes} from 'react-router-dom';

import {AppRouteElement} from '../appRouteElement/app-route-element';
import {MainContent} from '../main/main-component';
import styles from './styles.module.scss';

const AuthLayout = lazy(() => import('@src/layouts/auth-layout'));

const AuthPage = lazy(() => import('@src/pages/AuthPage/auth-page'));

const ErrorPage = lazy(() => import('@src/pages/ErrorPage/error-page'));

export const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     if (user) {
    //         setIsLoggedIn(true);
    //     }
    // }, []);

    return (
        <div className={styles.app}>
            {isLoggedIn ? (
                <MainContent />
            ) : (
                <Routes>
                    <Route
                        path={APP_ROUTES.AUTH}
                        element={
                            <AppRouteElement
                                layout={AuthLayout}
                                component={AuthPage}
                            />
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
                    <Route
                        path="*"
                        element={<Navigate to={APP_ROUTES.AUTH} />}
                    />
                </Routes>
            )}
        </div>
    );
};
