import {extractData} from '@src/api/config';
import {EndpointsTypes, endpointRequest} from '@src/api/endpointRequest';

import {UserForm} from './../../components/forms/interfaces';
import {ApiResponse} from '../randomUsers/interfaces';

export const loginRequest = (user: UserForm) =>
    endpointRequest(EndpointsTypes.Auth)
        .post<ApiResponse<UserForm[]>>(`/login`, user)
        .then(extractData);

export const logoutRequest = () =>
    endpointRequest(EndpointsTypes.Auth)
        .post<ApiResponse<UserForm>>(`/logout`)
        .then(extractData);
