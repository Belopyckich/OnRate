import './style.scss';

import {StyleProvider} from '@ant-design/cssinjs';
import {App} from '@components/app/index';
import store from '@redux/store';
import {ConfigProvider} from 'antd';
import ru_RU from 'antd/es/locale/ru_RU';
import React from 'react';
import {DndProvider} from 'react-dnd-multi-backend';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter, Router} from 'react-router-dom';
import {BreakpointProvider, setDefaultBreakpoints} from 'react-socks';

import ErrorBoundary from './components/errorBoundary/error-boundary';
import {HTML5toTouch} from './constants';
import {ThemeProvider} from './themes/theme-provider';

setDefaultBreakpoints([
    {xs: 0},
    {ss: 415},
    {sm: 576},
    {md: 768},
    {lg: 992},
    {xl: 1200},
    {xxl: 1400},
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <ConfigProvider locale={ru_RU}>
        <Provider store={store}>
            <BreakpointProvider>
                <BrowserRouter>
                    <DndProvider options={HTML5toTouch}>
                        <ThemeProvider>
                            <ErrorBoundary>
                                <StyleProvider hashPriority="low">
                                    <App />
                                </StyleProvider>
                            </ErrorBoundary>
                        </ThemeProvider>
                    </DndProvider>
                </BrowserRouter>
            </BreakpointProvider>
        </Provider>
    </ConfigProvider>,
);
