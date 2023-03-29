import {extractData} from '@src/api/config';
import {EndpointsTypes, endpointRequest} from '@src/api/endpointRequest';
import {UserForm} from '@src/components/forms/loginForm/interfaces';
import {RegistrateUserForm} from '@src/components/forms/registrationForm/interfaces';

import {ApiResponse} from '../randomUsers/interfaces';
import {LoginResponse, User} from './interfaces';

export const loginRequest = (user: UserForm) =>
    endpointRequest(EndpointsTypes.Auth)
        .post<ApiResponse<LoginResponse>>(`/login`, user)
        .then(extractData);

export const logoutRequest = () =>
    endpointRequest(EndpointsTypes.Auth)
        .post<ApiResponse<UserForm>>(`/logout`)
        .then(extractData);

export const registrateRequest = (user: RegistrateUserForm) =>
    endpointRequest(EndpointsTypes.Auth)
        .post<ApiResponse<User>>(`/registration`, user)
        .then(extractData);
