import {AxiosRequestConfig} from 'axios';
import {AxiosResponse} from 'axios';
import qs from 'qs';

export const baseConfig: AxiosRequestConfig = {
    paramsSerializer: {
        serialize: (params) => qs.stringify(params, {arrayFormat: 'brackets'}),
    },
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

export function extractData<T>(response: AxiosResponse<T>) {
    return response.data;
}
