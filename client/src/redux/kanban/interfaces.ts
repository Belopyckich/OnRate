import {KeyData} from '@src/typings';

export interface KanbanState {
    columns: KanbanColumnProps[];
    kanbanBoardDeals: KeyData<Task[]>;
    isLoading: boolean;
}

export interface Task {
    uid: number;
    title: string;
    text: string;
}

export interface KanbanColumnProps {
    _id: string;
    title: string;
    color: string;
    position: number;
    dealsCount: number;
}
