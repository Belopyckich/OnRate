import Icon from '@ant-design/icons';
import EditTaskIcon from '@src/assets/pencil-icon.component.svg';
import DeleteTaskIcon from '@src/assets/trash.component.svg';
import {
    ModalType,
    callModal,
    dangerousModalConfig,
    defaultModalConfig,
} from '@src/components/callModal/call-modal';
import {showKanbanEditOrCreateTaskDialog} from '@src/components/dialogs/kanbanTaskEditOrCreateDialog/actions';
import {ColumnFormType} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import {TaskFormType} from '@src/components/forms/kanbanEditOrCreateTaskForm/interfaces';
import {TextOverflow} from '@src/components/textOverflow/text-overflow';
import {deleteKanbanTask, editKanbanTask} from '@src/redux/kanban/actions';
import {KanbanTaskProps} from '@src/redux/kanban/interfaces';
import {selectKanbanColumns} from '@src/redux/kanban/selectors';
import {Button, Input} from 'antd';
import React, {useMemo} from 'react';
import {useDispatch} from 'react-redux';

import {KanbanColumn} from '../kanbanColumn/kanban-column';
import styles from './styles.module.scss';

export interface KanbanTaskElementProps {
    task: KanbanTaskProps;
}

export const KanbanTask = ({task}: KanbanTaskElementProps) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.kanbanTask}>
            <div className={styles.kanbanTaskHeader}>
                <TextOverflow
                    text={task.title}
                    extraClassName={styles.kanbanTaskHeaderText}
                />

                <Icon
                    component={EditTaskIcon}
                    onClick={() =>
                        dispatch(
                            showKanbanEditOrCreateTaskDialog({
                                type: TaskFormType.Edit,
                                _id: task._id,
                                initialValue: task,
                            }),
                        )
                    }
                    className={styles.kanbanTaskHeaderIcon}
                />

                <Icon
                    component={DeleteTaskIcon}
                    onClick={() =>
                        callModal({
                            modalType: ModalType.Confirm,
                            modalConfig: {
                                ...dangerousModalConfig.modalConfig,
                                content:
                                    'Вы действительно хотите удалить задачу',
                                okText: 'Удалить',
                                cancelText: 'Отмена',
                                onOk() {
                                    dispatch(deleteKanbanTask(task));
                                },
                            },
                        })
                    }
                    className={styles.kanbanTaskHeaderIcon}
                />
            </div>

            <div className={styles.kanbanTaskText}>{task.description}</div>
        </div>
    );
};
