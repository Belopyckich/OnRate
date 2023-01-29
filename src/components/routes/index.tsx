import {APP_ROUTES} from '@src/constants';
import React, {lazy} from 'react';
import {Routes} from 'react-router-dom';

import {AppRoute} from '../appRoute/app-route';

const MainPage = lazy(() => import('@src/pages/MainPage/main-page'));
const MainLayout = lazy(() => import('@src/layouts/main-layout'));

const MainRoutes = () => {
    console.log('mainLayout');

    return (
        <AppRoute
            path={APP_ROUTES.MAIN}
            component={MainPage}
            layout={MainLayout}
        />
    );
};

export default MainRoutes;
