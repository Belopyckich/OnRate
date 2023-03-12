import {AxiosInstance} from 'axios';

import {createApiEndpointInstance} from './endpointInstance';

/**
 * Список всех доступных контроллеров из папки /api/controllers
 * если добавятся новые контроллеры, внесите их ручками
 */
export enum EndpointsTypes {
    Auth = 'Auth',
}

const endpointList: {[x in EndpointsTypes]: () => AxiosInstance} = {
    [EndpointsTypes.Auth]: () => createApiEndpointInstance('/auth'),
};

export default endpointList;
