import {extractData} from '@src/api/config';
import {EndpointsTypes, endpointRequest} from '@src/api/endpointRequest';
import {Any} from '@src/typings';

import {ApiResponse} from '../app/interfaces';
import {KanbanColumnProps} from './interfaces';

export const createKanbanColumnRequest = (
    column: Pick<KanbanColumnProps, 'title' | 'color'>,
) =>
    endpointRequest(EndpointsTypes.Kanban)
        .post<ApiResponse<KanbanColumnProps>>(`/create-column`, column)
        .then(extractData);

export const deleteKanbanColumnRequest = (uid: string) =>
    endpointRequest(EndpointsTypes.Kanban)
        .post<ApiResponse<Any>>(`/delete-column`, {
            uid,
        })
        .then(extractData);

export const getKanbanColumnsRequest = () =>
    endpointRequest(EndpointsTypes.Kanban)
        .get<ApiResponse<KanbanColumnProps[]>>(`/columns`)
        .then(extractData);
