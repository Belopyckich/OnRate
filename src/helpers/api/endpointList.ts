import {AxiosInstance} from 'axios';

import {createApiEndpointInstance} from './endpointInstance';

/**
 * Список всех доступных контроллеров из папки /api/controllers
 * если добавятся новые контроллеры, внесите их ручками
 */
export enum EndpointsTypes {
    RandomUser = 'RandomUser',
}

const endpointList: {[x in EndpointsTypes]: () => AxiosInstance} = {
    [EndpointsTypes.RandomUser]: () =>
        createApiEndpointInstance('/randomuser.me/api'),
};

export default endpointList;
