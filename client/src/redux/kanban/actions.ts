import {
    CreateKanbanColumnProps,
    EditKanbanColumnProps,
} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import {
    CreateKanbanTaskProps,
    EditKanbanTaskProps,
} from '@src/components/forms/kanbanEditOrCreateTaskForm/interfaces';
import {KeyData} from '@src/typings';
import {DropResult} from 'react-beautiful-dnd';
import {createAction} from 'typesafe-actions';

import {
    KanbanBoardColumn,
    KanbanColumnProps,
    KanbanTaskProps,
    MoveColumnTasksProps,
    SetKanbanBoardColumnProps,
} from './interfaces';

export const getKanbanColumns = createAction('KANBAN/GET_KANBAN_COLUMNS')();

export const getKanbanBoardColumns = createAction(
    'KANBAN/GET_KANBAN_BOARD_COLUMNS',
)();

export const getKanbanTasksByColumn = createAction(
    'KANBAN/GET_KANBAN_TASKS_BY_COLUMN',
)<string>();

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

export const createKanbanTask = createAction(
    'KANBAN/CREATE_KANBAN_TASK',
)<CreateKanbanTaskProps>();

export const moveKanbanTask = createAction('KANBAN/MOVE_KANBAN_TASK')<
    Pick<DropResult, 'destination' | 'source' | 'draggableId'>
>();

export const editKanbanTask = createAction(
    'KANBAN/EDIT_KANBAN_TASK',
)<EditKanbanTaskProps>();

export const duplicateKanbanColumn = createAction(
    'KANBAN/DUPLICATE_KANBAN_COLUMN',
)<string>();

export const moveColumnTasks = createAction(
    'KANBAN/MOVE_COLUMN_TASKS',
)<MoveColumnTasksProps>();

export const deleteKanbanTask = createAction('KANBAN/DELETE_KANBAN_TASK')<
    Pick<KanbanTaskProps, '_id' | 'column'>
>();

export const deleteKanbanColumn = createAction(
    'KANBAN/DELETE_KANBAN_COLUMN',
)<string>();

export const getKanbanColumnTasks = createAction(
    'KANBAN/GET_KANBAN_COLUMN_TASKS',
)<KanbanColumnProps>();

export const setKanbanBoardColumns = createAction(
    'KANBAN/SET_KANBAN_BOARD_COLUMNS',
)<KeyData<KanbanBoardColumn>>();

export const setKanbanIsLoading = createAction(
    'KANBAN/SET_KANBAN_IS_LOADING',
)<boolean>();

export const setKanbanBoardColumn = createAction(
    'KANBAN/SET_KANBAN_BOARD_COLUMN',
)<SetKanbanBoardColumnProps>();
