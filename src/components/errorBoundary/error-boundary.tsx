import {devLog} from '@src/helpers/dev-log';
import ErrorPage from '@src/pages/ErrorPage/error-page';
import React, {ErrorInfo} from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: Error): State {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        devLog({error, errorInfo});
    }

    render() {
        const {
            props: {children},
            state: {hasError},
        } = this;

        if (hasError) {
            return <ErrorPage title="Что-то пошло не так" />;
        }

        return children;
    }
}

export default ErrorBoundary;
