import {ConnectedDialog} from '@src/components/dialog/dialog';
import {MoveColumnTasksForm} from '@src/components/forms/moveColumnTasksForm/move-column-tasks-form';
import React from 'react';
import {useDispatch} from 'react-redux';
import {useCurrentWidth} from 'react-socks';

import {closeMoveColumnTasksDialog} from './actions';
import {
    MOVE_COLUMN_TASKS_DIALOG_NAME,
    MOVE_COLUMN_TASKS_DIALOG_WIDTH,
} from './constants';
import {MoveColumnTasksDialogProps} from './interfaces';
import styles from './styles.module.scss';

export const MoveColumnTasksDialog = () => {
    const isMobile = useCurrentWidth() < MOVE_COLUMN_TASKS_DIALOG_WIDTH;

    return (
        <ConnectedDialog
            name={MOVE_COLUMN_TASKS_DIALOG_NAME}
            DialogBody={ColorPickerDialogBody}
            wrapClassName={styles.moveColumnTasksDialog}
            centered={!isMobile}
            destroyOnClose={true}
            maxWidth={MOVE_COLUMN_TASKS_DIALOG_WIDTH}
        />
    );
};

const ColorPickerDialogBody = ({sourceColumn}: MoveColumnTasksDialogProps) => {
    const dispatch = useDispatch();

    const onCancel = () => dispatch(closeMoveColumnTasksDialog());

    return (
        <MoveColumnTasksForm
            sourceColumn={sourceColumn}
            onCloseForm={onCancel}
            onSubmitForm={onCancel}
        />
    );
};
