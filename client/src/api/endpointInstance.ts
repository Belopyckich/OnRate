import {
    LOCAL_STORAGE_KEYS,
    getLocalStorageValue,
} from '@src/helpers/localStorageManagement';
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from 'axios';

import {baseConfig} from './config';

const instanceList: {url: string; instance: AxiosInstance}[] = [];

const findInstanceByUrl = (instanceUrl: string) =>
    instanceList.find(({url}) => instanceUrl === url);

export const createApiEndpointInstance = (url: string): AxiosInstance => {
    // ищем созданный инстанс в списке
    const foundInstance = findInstanceByUrl(url);
    if (!foundInstance) {
        const config: AxiosRequestConfig = {
            ...baseConfig,
            withCredentials: true,
            baseURL: `${API_URL}${url}`,
        };

        const instance = axios.create(config);

        instance.interceptors.request.use(async (value) => {
            const accessToken = getLocalStorageValue(
                LOCAL_STORAGE_KEYS.accessToken,
            );

            if (accessToken) {
                return {
                    ...value,
                    headers: {
                        ...config.headers,
                        Authorization: `Bearer ${getLocalStorageValue(
                            LOCAL_STORAGE_KEYS.accessToken,
                        )}`,
                    },
                } as InternalAxiosRequestConfig<any>;
            }

            return value;
        });

        console.log(instance, 'instance');

        // Заносим инстанс в список, чтобы потом не создавать его заново
        instanceList.push({url, instance});

        return instance;
    }

    return foundInstance.instance;
};
