import React, {lazy} from 'react';

const MainRoutes = lazy(() => import('@src/components/routes/index'));

export const MainContent = React.memo(() => {
    return <MainRoutes />;
});
