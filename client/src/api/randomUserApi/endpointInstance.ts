import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

import {baseConfig} from '../config';

export const randomUserRequest = (): AxiosInstance => {
    const config: AxiosRequestConfig = {
        ...baseConfig,
        baseURL: `https:/randomuser.me/api`,
    };

    const instance = axios.create(config);

    return instance;
};
