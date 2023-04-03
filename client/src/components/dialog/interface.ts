import {ModalProps} from 'antd';
import React from 'react';

export type DialogProps = Omit<
    ModalProps,
    'open' | 'children' | 'closeIcon' | 'title' | 'footer'
> & {
    name: string;
    DialogBody: (props: object) => JSX.Element;
};

export interface DialogConfigProps {
    name: string;
    title?: React.ReactElement | string;
}

export interface DialogState extends ShowDialogProps {
    open: boolean;
    isLoading?: boolean;
    isFormFieldsChanged?: boolean;
}

export interface ShowDialogProps {
    dialogConfig: DialogConfigProps;
    dialogProps?: object;
}
