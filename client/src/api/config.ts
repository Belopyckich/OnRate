import {AxiosRequestConfig} from 'axios';
import {AxiosResponse} from 'axios';
import qs from 'qs';

export type EndpointConfigData = {
    [key in keyof typeof EndpointConfigs]: AxiosRequestConfig;
};

export enum EndpointConfigs {
    base = 'base',
    formData = 'formData',
}

export const FORM_CONFIGS: EndpointConfigData = {
    [EndpointConfigs.base]: {
        paramsSerializer: {
            serialize: (params) =>
                qs.stringify(params, {arrayFormat: 'brackets'}),
        },
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    },
    [EndpointConfigs.formData]: {
        paramsSerializer: {
            serialize: (params) =>
                qs.stringify(params, {arrayFormat: 'brackets'}),
        },
    },
} as const;

export function extractData<T>(response: AxiosResponse<T>) {
    return response.data;
}
