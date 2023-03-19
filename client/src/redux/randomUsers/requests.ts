import {extractData} from '@src/api/config';
import {randomUserRequest} from '@src/api/randomUserApi/endpointInstance';

import {ApiResponse, RandomUser} from './interfaces';

export const getUsersRequest = () =>
    randomUserRequest()
        .get<ApiResponse<RandomUser[]>>(
            `/?results=1000&exc=gender,login,registered,phone,cell,nat&noinfo`,
        )
        .then(extractData);
