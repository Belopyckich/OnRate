import PlusIcon from '@src/assets/plus.component.svg';
import {
    ButtonWithIcon,
    ButtonWithIconType,
} from '@src/components/buttonWithIcon/button-with-icon';
import {showKanbanEditOrCreateColumnDialog} from '@src/components/dialogs/kanbanColumnEditOrCreateDialog/actions';
import {ColumnFormType} from '@src/components/forms/kanbanEditOrCreateColumnForm/interfaces';
import React from 'react';
import {useDispatch} from 'react-redux';

import styles from './styles.module.scss';

export const KanbanEmptyColumn = () => {
    const dispatch = useDispatch();

    return (
        <div
            className={styles.kanbanEmptyColumn}
            onClick={() =>
                dispatch(
                    showKanbanEditOrCreateColumnDialog({
                        type: ColumnFormType.Create,
                    }),
                )
            }
        >
            <ButtonWithIcon
                type={ButtonWithIconType.WithoutStyles}
                title={'Добавить колонку'}
            />
        </div>
    );
};
