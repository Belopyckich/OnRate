import store from '@redux/store';
import {COOKIE_KEYS} from '@src/constants/cookie-keys';
import {
    LOCAL_STORAGE_KEYS,
    getLocalStorageValue,
} from '@src/helpers/localStorageManagement';
import {setAccessToken} from '@src/redux/app/actions';
import {selectAccessToken} from '@src/redux/app/selectors';
import {Store} from 'antd/es/form/interface';
import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
} from 'axios';
import Cookies from 'js-cookie';

import {EndpointConfigs, FORM_CONFIGS} from './config';

const instanceList: {url: string; instance: AxiosInstance}[] = [];

const findInstanceByUrl = (instanceUrl: string) =>
    instanceList.find(({url}) => instanceUrl === url);

export const createApiEndpointInstance = (
    url: string,
    endpointConfigs: EndpointConfigs = EndpointConfigs.base,
): AxiosInstance => {
    // ищем созданный инстанс в списке
    const foundInstance = findInstanceByUrl(url);
    if (!foundInstance) {
        const config: AxiosRequestConfig = {
            ...FORM_CONFIGS[endpointConfigs],
            withCredentials: true,
            baseURL: `${API_URL}${url}`,
        };

        const instance = axios.create(config);

        instance.interceptors.request.use(async (value) => {
            const accessToken = await getAccessToken(store);

            if (accessToken) {
                return {
                    ...value,
                    headers: {
                        ...config.headers,
                        Authorization: `Bearer ${accessToken}`,
                    },
                } as InternalAxiosRequestConfig<any>;
            }

            return value;
        });

        // Заносим инстанс в список, чтобы потом не создавать его заново
        instanceList.push({url, instance});

        return instance;
    }

    return foundInstance.instance;
};

const getAccessToken = (store: Store) => {
    const {dispatch, getState} = store;
    const accessTokenCookie = Cookies.get(COOKIE_KEYS.accessToken);
    const accessTokenValue = selectAccessToken(getState());

    // Если кука есть, но в хранилище нет информации о ней
    if (accessTokenCookie && !accessTokenValue) {
        // Если значение есть в куке, выставляем
        dispatch({
            type: setAccessToken,
            accessToken: accessTokenCookie,
        });

        return new Promise((resolve) => resolve(accessTokenCookie));
    }
    return new Promise((resolve) => resolve(accessTokenValue));
};
