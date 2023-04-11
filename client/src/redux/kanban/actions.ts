import {
    CreateKanbanColumnProps,
    EditKanbanColumnProps,
} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import {KeyData} from '@src/typings';
import {DropResult} from 'react-beautiful-dnd';
import {createAction} from 'typesafe-actions';

import {KanbanColumnProps, Task} from './interfaces';

export const getKanbanColumns = createAction('KANBAN/GET_KANBAN_COLUMNS')();

export const setKanbanColumns = createAction('KANBAN/SET_KANBAN_COLUMNS')<
    KanbanColumnProps[]
>();

export const createKanbanColumn = createAction(
    'KANBAN/CREATE_KANBAN_COLUMN',
)<CreateKanbanColumnProps>();

export const editKanbanColumn = createAction(
    'KANBAN/EDIT_KANBAN_COLUMN',
)<EditKanbanColumnProps>();

export const moveKanbanColumn = createAction('KANBAN/MOVE_KANBAN_COLUMN')<
    Required<DropResult>
>();

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
