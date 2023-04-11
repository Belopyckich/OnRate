import {KeyData} from '@src/typings';
import {RGBColor} from 'react-color';

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
    color: RGBColor;
    position: number;
    dealsCount: number;
}

export type KanbanColumnPropsFromDb = Omit<KanbanColumnProps, 'color'> & {
    color: RGBColor & {
        _id: string;
    };
};
