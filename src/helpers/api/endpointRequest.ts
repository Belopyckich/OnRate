import {AxiosInstance} from 'axios';

import endpointList, {EndpointsTypes} from './endpointList';

export {EndpointsTypes};

/**
 * Получаем инстансы axios согласно endpointTypes
 * @param endpoint
 */
export const endpointRequest = (endpoint: EndpointsTypes): AxiosInstance =>
    endpointList[endpoint]();
