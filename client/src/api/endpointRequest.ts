import {AxiosInstance} from 'axios';

import {EndpointConfigs} from './config';
import endpointList, {EndpointsTypes} from './endpointList';

export {EndpointsTypes};

/**
 * Получаем инстансы axios согласно endpointTypes
 * @param endpoint
 */
export const endpointRequest = (
    endpoint: EndpointsTypes,
    endpointConfig: EndpointConfigs = EndpointConfigs.base,
): AxiosInstance => endpointList[endpoint](endpointConfig);
