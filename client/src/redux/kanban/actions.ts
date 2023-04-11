import {KanbanColumnFormValues} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import {KeyData} from '@src/typings';
import {createAction} from 'typesafe-actions';

import {KanbanColumnProps, Task} from './interfaces';

export const getKanbanColumns = createAction('KANBAN/GET_KANBAN_COLUMNS')();

export const setKanbanColumns = createAction('KANBAN/SET_KANBAN_COLUMNS')<
    KanbanColumnProps[]
>();

export const createKanbanColumn = createAction(
    'KANBAN/CREATE_KANBAN_COLUMN',
)<KanbanColumnFormValues>();

export const deleteKanbanColumn = createAction(
    'KANBAN/DELETE_KANBAN_COLUMN',
)<string>();

export const getKanbanColumnTasks = createAction(
    'KANBAN/GET_KANBAN_COLUMN_TASKS',
)<KanbanColumnProps>();

export const setKanbanBoardDeals = createAction(
    'KANBAN/SET_KANBAN_BOARD_DEALS',
)<KeyData<Task[]>>();

export const setKanbanIsLoading = createAction(
    'KANBAN/SET_KANBAN_IS_LOADING',
)<boolean>();
