import {extractData} from '@src/api/config';
import {EndpointsTypes, endpointRequest} from '@src/api/endpointRequest';
import {EditKanbanColumnProps} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import {Any} from '@src/typings';
import {DropResult} from 'react-beautiful-dnd';

import {ApiResponse} from '../app/interfaces';
import {
    KanbanColumnProps,
    KanbanColumnPropsFromDb,
    KanbanTaskProps,
} from './interfaces';

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

export const createKanbanTaskRequest = (
    task: Pick<KanbanTaskProps, 'title' | 'description' | 'column'>,
) =>
    endpointRequest(EndpointsTypes.Kanban)
        .post<ApiResponse<KanbanTaskProps>>(`/create-task`, task)
        .then(extractData);

export const moveKanbanTaskRequest = (
    result: Pick<DropResult, 'source' | 'destination' | 'draggableId'>,
) =>
    endpointRequest(EndpointsTypes.Kanban)
        .post<ApiResponse<KanbanTaskProps>>(`/move-task`, result)
        .then(extractData);

export const deleteKanbanTaskRequest = (
    payload: Pick<KanbanTaskProps, '_id' | 'column'>,
) =>
    endpointRequest(EndpointsTypes.Kanban)
        .post<ApiResponse<KanbanTaskProps[]>>(`/delete-task`, payload)
        .then(extractData);

export const editKanbanTaskRequest = (
    task: Pick<
        KanbanTaskProps,
        'title' | 'description' | '_id' | 'column' | 'position'
    >,
) =>
    endpointRequest(EndpointsTypes.Kanban)
        .post<ApiResponse<KanbanTaskProps>>(`/edit-task`, task)
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

export const getKanbanTasksByColumnRequest = (column: string) =>
    endpointRequest(EndpointsTypes.Kanban)
        .post<ApiResponse<KanbanTaskProps[]>>(`/tasks-by-column`, {
            column,
        })
        .then(extractData);
