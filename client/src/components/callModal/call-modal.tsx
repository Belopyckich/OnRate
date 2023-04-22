import Icon from '@ant-design/icons';
import AttentionIcon from '@src/assets/attention.component.svg';
import ConfirmationIcon from '@src/assets/confirmation.component.svg';
import {Modal, ModalFuncProps} from 'antd';
import React from 'react';

import {
    callableModalDangerous,
    callableModalDefault,
} from './styles.module.scss';

export enum ModalType {
    Confirm = 'confirm',
    Info = 'info',
}

export interface CallModal {
    modalType: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
    modalConfig: ModalFuncProps;
}

export const defaultModalConfig: CallModal = {
    modalType: ModalType.Confirm,
    modalConfig: {
        icon: <Icon component={ConfirmationIcon} />,
        title: 'Подтверждение',
        content: 'Вы действительно хотите сбросить значения?',
        className: callableModalDefault,
        closable: false,
        okText: 'Принять',
        okButtonProps: {danger: false, type: 'primary'},
        cancelText: 'Отмена',
        cancelButtonProps: {danger: false, type: 'default'},
        centered: true,
    },
};

export const dangerousModalConfig: CallModal = {
    modalType: ModalType.Confirm,
    modalConfig: {
        icon: <Icon component={AttentionIcon} />,
        title: 'Подтверждение',
        content: 'Вы действительно хотите сбросить значения?',
        className: callableModalDangerous,
        closable: false,
        okText: 'Удалить',
        okButtonProps: {danger: true, type: 'primary'},
        cancelText: 'Отмена',
        cancelButtonProps: {danger: true, type: 'default'},
        centered: true,
    },
};

export const callModal = ({modalType, modalConfig}: CallModal) => {
    Modal[modalType](modalConfig);
};
