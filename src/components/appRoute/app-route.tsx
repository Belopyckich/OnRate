import ErrorBoundary from '@components/errorBoundary/error-boundary';
import React, {Suspense} from 'react';
import {Route, RouteProps, Routes} from 'react-router-dom';

import {Preloader} from '../preloader/preloader';

type Props = {
    component: React.ComponentType<any>;
    layout: React.ComponentClass<any, any> | React.FunctionComponent<any>;
    shouldRedirect?: boolean;
} & RouteProps;

export const AppRoute = ({
    component: Component,
    layout: Layout,
    ...rest
}: Props) => (
    <Routes>
        <Route
            {...rest}
            element={
                <Suspense
                    fallback={
                        <Preloader text="Идет загрузка необходимых компонентов..." />
                    }
                >
                    <Layout>
                        <ErrorBoundary>
                            <Component />
                        </ErrorBoundary>
                    </Layout>
                </Suspense>
            }
        />
    </Routes>
);
