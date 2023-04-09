import {EndpointConfigs, extractData} from '@src/api/config';
import {EndpointsTypes, endpointRequest} from '@src/api/endpointRequest';
import {UserForm} from '@src/components/forms/loginForm/interfaces';
import {RegistrateUserForm} from '@src/components/forms/registrationForm/interfaces';
import axios from 'axios';

import {
    ApiResponse,
    AuthorizeResponse,
    User,
    UserForUpdate,
} from './interfaces';

export const loginRequest = (user: UserForm) =>
    endpointRequest(EndpointsTypes.Auth)
        .post<ApiResponse<AuthorizeResponse>>(`/login`, user)
        .then(extractData);

export const logoutRequest = (token: string) =>
    endpointRequest(EndpointsTypes.Auth)
        .post<ApiResponse<AuthorizeResponse>>(`/logout`, {
            refreshToken: token,
        })
        .then(extractData);

export const registrateRequest = (user: RegistrateUserForm) =>
    endpointRequest(EndpointsTypes.Auth)
        .post<ApiResponse<AuthorizeResponse>>(`/registration`, user)
        .then(extractData);

export const updateUserRequest = (user: FormData) =>
    endpointRequest(EndpointsTypes.User, EndpointConfigs.formData)
        .post<ApiResponse<User>>(`/update`, user)
        .then(extractData);

export const checkAuthRequest = async () =>
    await axios
        .get<ApiResponse<AuthorizeResponse>>(`${API_URL}/auth/refresh`, {
            withCredentials: true,
        })
        .then(extractData);
