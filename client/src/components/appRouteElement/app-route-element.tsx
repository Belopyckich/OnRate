import ErrorBoundary from '@components/errorBoundary/error-boundary';
import React, {Suspense} from 'react';

import {Preloader} from '../preloader/preloader';

type Props = {
    component: React.ComponentType<any>;
    layout: React.ComponentClass<any, any> | React.FunctionComponent<any>;
    shouldRedirect?: boolean;
};

export const AppRouteElement = ({
    component: Component,
    layout: Layout,
}: Props) => (
    <Suspense
        fallback={<Preloader text="Идет загрузка необходимых компонентов..." />}
    >
        <Layout>
            <ErrorBoundary>
                <Component />
            </ErrorBoundary>
        </Layout>
    </Suspense>
);
