import store from '@redux/store';
import {showNotification} from '@src/components/showNotification/show-notification';
import {notification} from 'antd';
import axios, {AxiosRequestConfig} from 'axios';
import {AxiosResponse} from 'axios';
import qs from 'qs';

export const baseConfig: AxiosRequestConfig = {
    paramsSerializer: {
        serialize: (params: any) =>
            qs.stringify(params, {arrayFormat: 'brackets'}),
    },
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

export const responseInterceptorSuccess = (response: any) => response;

export const responseInterceptorFail = (error: any) => {
    const status = error?.status || error?.response?.status;
    if (status === 401) {
        notification.destroy();
        if (sessionStorage.getItem('deniedAccess') !== 'true') {
            setTimeout(() => {
                showNotification(
                    'Ошибка авторизации. Обратитесь к руководителю',
                );
            }, 1000);
        }
        return false;
    }
    return Promise.reject(error);
};

export function extractData<T>(response: AxiosResponse<T>) {
    return response.data;
}
