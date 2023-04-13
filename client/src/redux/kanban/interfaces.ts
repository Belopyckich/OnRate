import {KeyData} from '@src/typings';
import {RGBColor} from 'react-color';

export interface KanbanState {
    columns: KanbanColumnProps[];
    kanbanBoardColumns: KeyData<KanbanBoardColumn>;
    isLoading: boolean;
}

export interface KanbanColumnProps {
    _id: string;
    title: string;
    color: RGBColor;
    position: number;
    dealsCount: number;
}

export interface KanbanTaskProps {
    _id: string;
    title: string;
    description: string;
    position: number;
    column: string;
}

export interface KanbanBoardColumn {
    tasks: KanbanTaskProps[];
    isLoading: boolean;
}

export type KanbanColumnPropsFromDb = Omit<KanbanColumnProps, 'color'> & {
    color: RGBColor & {
        _id: string;
    };
};

export interface SetKanbanBoardColumnProps {
    column_uid: string;
    data: Partial<KanbanBoardColumn>;
}
