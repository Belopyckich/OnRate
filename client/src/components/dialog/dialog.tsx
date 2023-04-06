import {State} from '@redux/reducers';
import {selectDialog} from '@src/redux/dialog/selectors';
import {Modal} from 'antd';
import cn from 'classnames';
import React from 'react';
import {useSelector} from 'react-redux';

import {DialogHeader} from './dialog-header';
import {DialogProps} from './interface';

export const ConnectedDialog = ({
    name,
    maxWidth,
    DialogBody,
    wrapClassName,
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
            wrapClassName={wrapClassName}
            width={'100%'}
            style={{
                maxWidth,
            }}
            {...modalProps}
        >
            <DialogBody {...dialog?.dialogProps} />
        </Modal>
    );
};
