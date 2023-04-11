import 'react-image-crop/dist/ReactCrop.css';

import Icon from '@ant-design/icons';
import MoveIcon from '@src/assets/move-icon.component.svg';
import PencilIcon from '@src/assets/pencil-icon.component.svg';
import DeleteIcon from '@src/assets/trash.component.svg';
import {TextOverflow} from '@src/components/textOverflow/text-overflow';
import {
    checkIsLightBackground,
    getRgbStyleFromString,
} from '@src/helpers/perfect-colors';
import {deleteKanbanColumn} from '@src/redux/kanban/actions';
import {KanbanColumnProps} from '@src/redux/kanban/interfaces';
import cn from 'classnames';
import React, {useState} from 'react';
import {
    DragDropContext,
    Draggable,
    DraggableProvided,
    Droppable,
} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';

import styles from './styles.module.scss';

export interface KanbanColumnItemProps {
    column: KanbanColumnProps;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
}

export const KanbanColumnItem = ({
    column: {_id, title, color},
    onEditClick,
    onDeleteClick,
}: KanbanColumnItemProps) => {
    const dispatch = useDispatch();

    const isLightColumnBackground = checkIsLightBackground(color);

    const columnItemStyles = isLightColumnBackground
        ? styles.kanbanColumnItemIsLight
        : styles.kanbanColumnItemIsDark;

    return (
        <Draggable draggableId={_id} index={Number(_id)}>
            {(providedDraggable: DraggableProvided) => (
                <div
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.draggableProps}
                    {...providedDraggable.dragHandleProps}
                >
                    <div
                        style={{backgroundColor: getRgbStyleFromString(color)}}
                        className={cn(
                            styles.kanbanColumnItem,
                            columnItemStyles,
                        )}
                    >
                        <Icon component={MoveIcon} />

                        <TextOverflow
                            text={title}
                            extraClassName={columnItemStyles}
                        />

                        <Icon
                            component={PencilIcon}
                            className={styles.kanbanColumnItemClickedIcon}
                            onClick={() => onEditClick?.()}
                        />

                        <Icon
                            component={DeleteIcon}
                            className={styles.kanbanColumnItemClickedIcon}
                            onClick={() => onDeleteClick?.()}
                        />
                    </div>
                </div>
            )}
        </Draggable>
    );
};
