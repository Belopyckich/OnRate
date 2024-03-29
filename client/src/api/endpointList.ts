import {AxiosInstance} from 'axios';

import {EndpointConfigs} from './config';
import {createApiEndpointInstance} from './endpointInstance';

/**
 * Список всех доступных контроллеров из папки /api/controllers
 * если добавятся новые контроллеры, внесите их ручками
 */
export enum EndpointsTypes {
    Auth = 'Auth',
    User = 'User',
    Kanban = 'Kanban',
}

const endpointList: {
    [x in EndpointsTypes]: (config: EndpointConfigs) => AxiosInstance;
} = {
    [EndpointsTypes.Auth]: (endpointConfig: EndpointConfigs) =>
        createApiEndpointInstance('/auth', endpointConfig),
    [EndpointsTypes.User]: (endpointConfig: EndpointConfigs) =>
        createApiEndpointInstance('/user', endpointConfig),
    [EndpointsTypes.Kanban]: (endpointConfig: EndpointConfigs) =>
        createApiEndpointInstance('/kanban', endpointConfig),
};

export default endpointList;
