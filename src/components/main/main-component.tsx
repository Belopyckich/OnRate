import React, {lazy} from 'react';
import {Routes} from 'react-router-dom';

import {SuspenseSpin} from '../suspense/suspense';

const MainRoutes = lazy(() => import('@src/components/routes/index'));

export const MainContent = React.memo(() => {
    console.log('privet');

    return (
        <SuspenseSpin>
            <MainRoutes />
        </SuspenseSpin>
    );
});
