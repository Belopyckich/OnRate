import {KeyData} from '@src/typings';
import {createAction} from 'typesafe-actions';

import {KanbanColumnProps, Task} from './interfaces';

export const getKanbanColumns = createAction('KANBAN/GET_KANBAN_COLUMNS')();

export const setKanbanColumns = createAction('KANBAN/SET_KANBAN_COLUMNS')<
    KanbanColumnProps[]
>();

export const getKanbanColumnTasks = createAction(
    'KANBAN/GET_KANBAN_COLUMN_TASKS',
)<KanbanColumnProps>();

export const setKanbanBoardDeals = createAction(
    'KANBAN/SET_KANBAN_BOARD_DEALS',
)<KeyData<Task[]>>();

export const setKanbanIsLoading = createAction(
    'KANBAN/SET_KANBAN_IS_LOADING',
)<boolean>();
