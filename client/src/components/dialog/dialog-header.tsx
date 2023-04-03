import {CloseOutlined} from '@ant-design/icons';
import * as dialogActions from '@redux/dialog/actions';
import React from 'react';
import {useDispatch} from 'react-redux';

import {DialogConfigProps} from './interface';
import styles from './styles.module.scss';

export const DialogHeader = ({title, name}: Partial<DialogConfigProps>) => {
    const dispatch = useDispatch();

    return (
        <div className={styles.dialogHeader}>
            <div className={styles.dialogHeaderContent}>{title}</div>

            <CloseOutlined
                className={styles.dialogHeaderIcons}
                onClick={() => name && dispatch(dialogActions.close(name))}
            />
        </div>
    );
};
