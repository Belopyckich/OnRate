import * as dialogActions from '@redux/dialog/actions';
import {ConnectedDialog} from '@src/components/dialog/dialog';
import React from 'react';

export const HAPPY_BIRTHDAY_DIALOG_NAME = 'HELLO';

export const KanbanDialog = () => (
    <ConnectedDialog
        name={HAPPY_BIRTHDAY_DIALOG_NAME}
        DialogBody={DialogBody}
        destroyOnClose={true}
        centered={true}
    />
);

export const DialogBody = (props: object) => {
    console.log(props, 'props');
    return <div>{JSON.stringify(props)}</div>;
};

export const showKanbanDialog = (dialogProps?: any) =>
    dialogActions.show({
        dialogConfig: {
            name: HAPPY_BIRTHDAY_DIALOG_NAME,
            title: 'ДАРОВА',
        },
        dialogProps: {
            JOPPA: 'Я ЛЮБЛЮ КАКАТЬ',
        },
    });