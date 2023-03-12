import Icon from '@ant-design/icons';
// import CloseDialogIcon from '@assets/images/close-dialog-icon.component.svg';
import {messages} from '@constants/messages';
import {KeyData} from '@src/typings';
import {notification} from 'antd';
import {ArgsProps} from 'antd/lib/notification/interface';
import {nanoid} from 'nanoid';
import React from 'react';

import {notificationCloseIcon} from './styles.module.scss';

export interface ErrorObject {
    field: string;
    message: string;
}

export interface ErrorArray {
    errors: Omit<ErrorObject, 'message'> &
        {message: string | KeyData<string>}[];
}

export type MessageInfo = string | React.ReactElement;

export enum MessageType {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warning = 'warning',
}

const NotificationWrapper = ({
    message,
}: {
    message: string | React.ReactElement;
}) => {
    if (React.isValidElement(message)) {
        return message;
    }

    return (
        <>
            {message.split('\n').map((msg, i) => (
                <div key={i}>{msg}</div>
            ))}
        </>
    );
};

const getHeaderMessage = (typeMessage: MessageType) => {
    switch (typeMessage) {
        case MessageType.Error:
            return messages.notifyError;
        case MessageType.Warning:
            return messages.notifyWarning;
        case MessageType.Success:
            return messages.notifySuccessfully;
        default:
            return messages.notifyInfo;
    }
};

let openedNotifications: string[] = [];

export const showNotification = (
    message: string | MessageInfo = messages.error,
    messageType: MessageType = MessageType.Error,
    config?: ArgsProps,
) => {
    const notificationKey = nanoid();

    const notificationConfig = {
        ...config,
        message: config?.message || getHeaderMessage(messageType),
        key: notificationKey,
        type: messageType,
        onClose: () => removeKeyFromNotificationStore(notificationKey),
        // closeIcon: (
        //     <Icon
        //         component={CloseDialogIcon}
        //         className={notificationCloseIcon}
        //     />
        // ),
        description: <NotificationWrapper message={message} />,
    } as ArgsProps;

    openedNotifications.push(notificationKey);

    const removeKeyFromNotificationStore = (key: string) => {
        openedNotifications = openedNotifications.filter(
            (openedNotificationKey) => openedNotificationKey !== key,
        );
        notification.destroy(key);
    };

    if (openedNotifications.length > 5) {
        removeKeyFromNotificationStore(openedNotifications[0]);
    }

    notification.open(notificationConfig);
};
