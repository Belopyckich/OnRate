import 'react-image-crop/dist/ReactCrop.css';

import {closeImageEditorDialog} from '@components/dialogs/imageEditorDialog/actions';
import {ConnectedDialog} from '@src/components/dialog/dialog';
import {
    ColumnFormType,
    KanbanEditOrCreateColumnFormProps,
} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import {KanbanEditOrCreateColumnForm} from '@src/components/forms/kanbanEditOrCreateColumnForm/kanban-edit-or-create-column-form';
import {Avatar, Button, Upload, UploadProps} from 'antd';
import React, {useEffect, useState} from 'react';
import ReactCrop, {Crop} from 'react-image-crop';
import {useDispatch} from 'react-redux';

import {closeKanbanEditOrCreateColumnDialog} from './actions';
import {
    KANBAN_EDIT_OR_CREATE_COLUMN_DIALOG_NAME,
    KANBAN_EDIT_OR_CREATE_COLUMN_DIALOG_WIDTH,
} from './constants';
import styles from './styles.module.scss';

export const KanbanEditOrCreateColumnDialog = () => (
    <ConnectedDialog
        name={KANBAN_EDIT_OR_CREATE_COLUMN_DIALOG_NAME}
        DialogBody={KanbanEditOrCreateColumnDialogBody}
        className={styles.kanbanEditOrCreateDialog}
        destroyOnClose={true}
        maxWidth={KANBAN_EDIT_OR_CREATE_COLUMN_DIALOG_WIDTH}
    />
);

const KanbanEditOrCreateColumnDialogBody = ({
    type,
    initialValue,
    _id,
}: KanbanEditOrCreateColumnFormProps) => {
    const dispatch = useDispatch();

    return type === ColumnFormType.Create ? (
        <KanbanEditOrCreateColumnForm
            type={type}
            onSubmitForm={() => {
                dispatch(closeKanbanEditOrCreateColumnDialog());
            }}
            onCloseForm={() => {
                dispatch(closeKanbanEditOrCreateColumnDialog());
            }}
        />
    ) : (
        <KanbanEditOrCreateColumnForm
            type={type}
            initialValue={initialValue}
            _id={_id}
            onSubmitForm={() => {
                dispatch(closeKanbanEditOrCreateColumnDialog());
            }}
            onCloseForm={() => {
                dispatch(closeKanbanEditOrCreateColumnDialog());
            }}
        />
    );
};
