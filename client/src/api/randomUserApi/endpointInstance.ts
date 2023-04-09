import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

import {EndpointConfigs, FORM_CONFIGS} from '../config';

export const randomUserRequest = (): AxiosInstance => {
    const config: AxiosRequestConfig = {
        ...FORM_CONFIGS[EndpointConfigs.base],
        baseURL: `https:/randomuser.me/api`,
    };

    const instance = axios.create(config);

    return instance;
};
