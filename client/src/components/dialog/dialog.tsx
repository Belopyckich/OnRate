import Icon from '@ant-design/icons';
import {State} from '@redux/reducers';
import {selectDialog, selectDialogOpen} from '@src/redux/dialog/selectors';
import {Modal} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';

import {DialogHeader} from './dialog-header';
import {DialogProps} from './interface';

export const ConnectedDialog = ({
    name,
    DialogBody,
    ...modalProps
}: DialogProps) => {
    const dialog = useSelector((state: State) => selectDialog(state, name));

    return (
        <Modal
            open={dialog?.open}
            closable={false}
            title={
                <DialogHeader
                    title={dialog?.dialogConfig.title}
                    name={dialog?.dialogConfig.name}
                />
            }
            footer={''}
            {...modalProps}
        >
            <DialogBody {...dialog?.dialogProps} />
        </Modal>
    );
};
