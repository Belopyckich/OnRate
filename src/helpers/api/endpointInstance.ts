import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

import {
    baseConfig,
    responseInterceptorFail,
    responseInterceptorSuccess,
} from './config';

const instanceList: {url: string; instance: AxiosInstance}[] = [];

const findInstanceByUrl = (instanceUrl: string) =>
    instanceList.find(({url}) => instanceUrl === url);

export const createApiEndpointInstance = (url: string): AxiosInstance => {
    // ищем созданный инстанс в списке
    const foundInstance = findInstanceByUrl(url);
    if (!foundInstance) {
        const config: AxiosRequestConfig = {
            ...baseConfig,
            baseURL: `https:/${url}`,
        };

        const instance = axios.create(config);

        instance.interceptors.response.use(
            responseInterceptorSuccess,
            responseInterceptorFail,
        );

        // instance.interceptors.request.use(
        //     async (config: AxiosRequestConfig) => {
        //         const {params = {}} = config;
        //         return {
        //             ...config,
        //             params: {
        //                 ...params,
        //                 'access-token': await getAccessToken(mainStore),
        //             },
        //         };
        //     },
        // );

        // Заносим инстанс в список, чтобы потом не создавать его заново
        instanceList.push({url, instance});

        return instance;
    }

    return foundInstance.instance;
};
