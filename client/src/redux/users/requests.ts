import {extractData} from '@src/helpers/api/config';
import {
    EndpointsTypes,
    endpointRequest,
} from '@src/helpers/api/endpointRequest';

import {ApiResponse, User} from './interfaces';

export const getUsersRequest = () =>
    endpointRequest(EndpointsTypes.RandomUser)
        .get<ApiResponse<User[]>>(`?results=1000&exc=login,cell,registered,id`)
        .then(extractData);
