import {extractData} from '@src/api/config';
import {randomUserRequest} from '@src/api/randomUserApi/endpointInstance';

import {ApiResponse} from './interfaces';

export const getUsersRequest = () =>
    randomUserRequest()
        .get<ApiResponse<any[]>>(`?results=1000&exc=login,cell,registered,id`)
        .then(extractData);
