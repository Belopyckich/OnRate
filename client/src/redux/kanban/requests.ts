import {extractData} from '@src/api/config';
import {EndpointsTypes, endpointRequest} from '@src/api/endpointRequest';
import {EditKanbanColumnProps} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import {Any} from '@src/typings';

import {ApiResponse} from '../app/interfaces';
import {KanbanColumnProps, KanbanColumnPropsFromDb} from './interfaces';

export const createKanbanColumnRequest = (
    column: Pick<KanbanColumnProps, 'title' | 'color'>,
) =>
    endpointRequest(EndpointsTypes.Kanban)
        .post<ApiResponse<KanbanColumnPropsFromDb>>(`/create-column`, column)
        .then(extractData);

export const deleteKanbanColumnRequest = (uid: string) =>
    endpointRequest(EndpointsTypes.Kanban)
        .post<ApiResponse<never>>(`/delete-column`, {
            uid,
        })
        .then(extractData);

export const editKanbanColumnRequest = (
    column: Pick<KanbanColumnProps, 'title' | 'color' | '_id'>,
) =>
    endpointRequest(EndpointsTypes.Kanban)
        .post<ApiResponse<KanbanColumnPropsFromDb>>(`/edit-column`, column)
        .then(extractData);

export const moveKanbanColumnRequest = (
    columns: Pick<KanbanColumnProps, '_id' | 'position'>[],
) =>
    endpointRequest(EndpointsTypes.Kanban)
        .post<ApiResponse<never>>(`/move-column`, columns)
        .then(extractData);

export const getKanbanColumnsRequest = () =>
    endpointRequest(EndpointsTypes.Kanban)
        .get<ApiResponse<KanbanColumnPropsFromDb[]>>(`/columns`)
        .then(extractData);
