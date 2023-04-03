import {HTML5Backend} from 'react-dnd-html5-backend';
import {MouseTransition, TouchTransition} from 'react-dnd-multi-backend';
import {TouchBackend} from 'react-dnd-touch-backend';

export const HTML5toTouch = {
    backends: [
        {
            id: 'html5',
            backend: HTML5Backend,
            transition: MouseTransition,
        },
        {
            id: 'touch',
            backend: TouchBackend,
            options: {enableMouseEvents: true},
            preview: true,
            transition: TouchTransition,
        },
    ],
};

export const APP_ROUTES = {
    AUTH: '/auth',
    KANBAN: '/kanban',
    ERROR: '/error',
    USER_SETTINGS: '/user-settings',
    ENVIRONMENT_SETTINGS: '/environment-settings',
} as const;

export const COLOR_WHITE = '#FFFFFF';

export const COLOR_BLACK = '#000000';
