import 'react-image-crop/dist/ReactCrop.css';

import {closeImageEditorDialog} from '@components/dialogs/imageEditorDialog/actions';
import {ConnectedDialog} from '@src/components/dialog/dialog';
import {
    ColumnFormType,
    KanbanEditOrCreateColumnFormProps,
} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import {KanbanEditOrCreateColumnForm} from '@src/components/forms/kanbanEditOrCreateColumnForm/kanban-edit-or-create-column-form';
import {
    KanbanEditOrCreateTaskFormProps,
    TaskFormType,
} from '@src/components/forms/kanbanEditOrCreateTaskForm/interfaces';
import {KanbanEditOrCreateTaskForm} from '@src/components/forms/kanbanEditOrCreateTaskForm/kanban-edit-or-create-task-form';
import {Avatar, Button, Upload, UploadProps} from 'antd';
import React, {useEffect, useState} from 'react';
import ReactCrop, {Crop} from 'react-image-crop';
import {useDispatch} from 'react-redux';

import {closeKanbanEditOrCreateTaskDialog} from './actions';
import {
    KANBAN_EDIT_OR_CREATE_TASK_DIALOG_NAME,
    KANBAN_EDIT_OR_CREATE_TASK_DIALOG_WIDTH,
} from './constants';
import styles from './styles.module.scss';

export const KanbanEditOrCreateTaskDialog = () => (
    <ConnectedDialog
        name={KANBAN_EDIT_OR_CREATE_TASK_DIALOG_NAME}
        DialogBody={KanbanEditOrCreateColumnDialogBody}
        wrapClassName={styles.kanbanEditOrCreateTaskDialog}
        destroyOnClose={true}
        maxWidth={KANBAN_EDIT_OR_CREATE_TASK_DIALOG_WIDTH}
    />
);

const KanbanEditOrCreateColumnDialogBody = ({
    type,
    initialValue,
    _id,
}: KanbanEditOrCreateTaskFormProps) => {
    const dispatch = useDispatch();

    return type === TaskFormType.Create ? (
        <KanbanEditOrCreateTaskForm
            type={type}
            onSubmitForm={() => {
                dispatch(closeKanbanEditOrCreateTaskDialog());
            }}
            onCloseForm={() => {
                dispatch(closeKanbanEditOrCreateTaskDialog());
            }}
        />
    ) : (
        <KanbanEditOrCreateTaskForm
            type={type}
            initialValue={initialValue}
            _id={_id}
            onSubmitForm={() => {
                dispatch(closeKanbanEditOrCreateTaskDialog());
            }}
            onCloseForm={() => {
                dispatch(closeKanbanEditOrCreateTaskDialog());
            }}
        />
    );
};
