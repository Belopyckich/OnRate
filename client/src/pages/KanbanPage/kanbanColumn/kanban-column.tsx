import Icon from '@ant-design/icons';
import EmptyColumnIcon from '@src/assets/empty-column.component.svg';
import ExtendIcon from '@src/assets/extend-icon.component.svg';
import PlusIcon from '@src/assets/plus.component.svg';
import {
    ModalType,
    callModal,
    dangerousModalConfig,
} from '@src/components/callModal/call-modal';
import {EmptyBlock} from '@src/components/emptyBlock/empty-block';
import {TextOverflow} from '@src/components/textOverflow/text-overflow';
import {COLOR_BLACK} from '@src/constants';
import {
    getOppositeTitleColor,
    getRgbStyleFromString,
} from '@src/helpers/perfect-colors';
import {deleteKanbanColumn} from '@src/redux/kanban/actions';
import {KanbanColumnProps} from '@src/redux/kanban/interfaces';
import {selectKanbanBoardColumn} from '@src/redux/kanban/selectors';
import {State} from '@src/redux/reducers';
import {Button, Divider, Dropdown} from 'antd';
import cn from 'classnames';
import React from 'react';
import {
    Draggable,
    DraggableProvided,
    Droppable,
    DroppableProvided,
} from 'react-beautiful-dnd';
import {useDispatch, useSelector} from 'react-redux';

import {KanbanTask} from '../KanbanTask/kanban-task';
import {
    KANBAN_COLUMN_DROPDOWN_TITLES,
    KanbanColumnDropdownKeys,
} from './constants';
import {sortKanbanColumnTasks} from './helpers';
import styles from './styles.module.scss';

export interface KanbanColumnData {
    column: KanbanColumnProps;
    addTask: () => void;
    deleteTask: () => void;
    moveTasks: () => void;
    duplicateTask: () => void;
}

export const KanbanColumn = ({
    column,
    addTask,
    deleteTask,
    moveTasks,
    duplicateTask,
}: KanbanColumnData) => {
    const {_id: columnUid, color: columnColor, title: columnTitle} = column;

    const tasksList = useSelector((state: State) =>
        selectKanbanBoardColumn(state, columnUid),
    );

    const isDarkBackground = getOppositeTitleColor(columnColor) === COLOR_BLACK;

    const menu = {
        items: [
            {
                label: KANBAN_COLUMN_DROPDOWN_TITLES[
                    KanbanColumnDropdownKeys.AddTask
                ],
                key: KanbanColumnDropdownKeys.AddTask,
                onClick: addTask,
            },
            {
                label: KANBAN_COLUMN_DROPDOWN_TITLES[
                    KanbanColumnDropdownKeys.DuplicateColumn
                ],
                key: KanbanColumnDropdownKeys.DuplicateColumn,
                onClick: duplicateTask,
            },
            {
                label: KANBAN_COLUMN_DROPDOWN_TITLES[
                    KanbanColumnDropdownKeys.MoveTasks
                ],
                key: KanbanColumnDropdownKeys.MoveTasks,
                onClick: moveTasks,
            },
            {
                label: KANBAN_COLUMN_DROPDOWN_TITLES[
                    KanbanColumnDropdownKeys.DeleteTasks
                ],
                key: KanbanColumnDropdownKeys.DeleteTasks,
                danger: true,
                onClick: deleteTask,
            },
        ],
    };

    return (
        <div className={styles.kanbanColumn}>
            <div
                className={styles.kanbanColumnHeader}
                style={{backgroundColor: getRgbStyleFromString(columnColor)}}
            >
                <TextOverflow
                    text={columnTitle}
                    extraTextStyles={{
                        color: getOppositeTitleColor(columnColor),
                    }}
                    extraClassName={styles.kanbanColumnHeaderTitle}
                />

                <Dropdown menu={menu} trigger={['click']}>
                    <Icon
                        component={ExtendIcon}
                        className={cn(styles.kanbanColumnHeaderIcon, {
                            [styles.kanbanColumnHeaderIconDark]:
                                isDarkBackground,
                        })}
                    />
                </Dropdown>
            </div>

            <Droppable droppableId={columnUid}>
                {(provided: DroppableProvided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={styles.kanbanColumnContentWrap}
                    >
                        {tasksList?.tasks?.length ? (
                            <div className={styles.kanbanColumnContent}>
                                {sortKanbanColumnTasks(tasksList.tasks).map(
                                    (task, index) => (
                                        <Draggable
                                            draggableId={task._id}
                                            index={index}
                                            key={task._id}
                                        >
                                            {(
                                                providedDraggable: DraggableProvided,
                                            ) => (
                                                <div
                                                    ref={
                                                        providedDraggable.innerRef
                                                    }
                                                    {...providedDraggable.draggableProps}
                                                    {...providedDraggable.dragHandleProps}
                                                >
                                                    <KanbanTask
                                                        task={task}
                                                        key={task._id}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ),
                                )}
                            </div>
                        ) : (
                            <EmptyBlock
                                customLightThemeIcon={EmptyColumnIcon}
                                customDarkThemeIcon={EmptyColumnIcon}
                                extraClassName={styles.kanbanColumnEmptyBlock}
                                description={
                                    <>
                                        <div
                                            className={
                                                styles.kanbanColumnEmptyBlockTitle
                                            }
                                        >
                                            Колонка пуста
                                        </div>

                                        <div
                                            className={
                                                styles.kanbanColumnEmptyBlockDescription
                                            }
                                        >
                                            Нажмите «Добавить карточку» для
                                            продолжения работы с колонкой
                                        </div>
                                    </>
                                }
                            />
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            <div className={styles.kanbanColumnFooter}>
                <Divider />

                <Icon
                    component={PlusIcon}
                    className={styles.kanbanColumnFooterIcon}
                />

                <Button type="link" onClick={addTask}>
                    Добавить карточку
                </Button>
            </div>
        </div>
    );
};
