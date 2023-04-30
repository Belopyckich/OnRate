import {APP_ROUTES} from '@src/constants';
import {checkAuth} from '@src/redux/app/actions';
import {selectCurrentUser} from '@src/redux/app/selectors';
import React, {lazy, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';

import {AppRouteElement} from '../appRouteElement/app-route-element';
import {MainContent} from '../main/main-component';
import styles from './styles.module.scss';

const AuthLayout = lazy(() => import('@src/layouts/auth-layout'));

const AuthPage = lazy(() => import('@src/pages/AuthPage/auth-page'));

const ErrorPage = lazy(() => import('@src/pages/ErrorPage/error-page'));

export const App = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);

    const history = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        dispatch(
            checkAuth({
                onCallback: (path) => history(path),
            }),
        );
    }, []);

    useEffect(() => {
        setIsLoggedIn(Boolean(currentUser));
    }, [currentUser]);

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
