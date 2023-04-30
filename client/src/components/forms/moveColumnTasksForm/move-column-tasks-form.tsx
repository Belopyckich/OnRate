import {ColorOption} from '@src/components/colorOption/color-option';
import ColorPicker from '@src/components/dialogs/colorPicker/color-picker';
import {moveColumnTasks} from '@src/redux/kanban/actions';
import {selectKanbanColumns} from '@src/redux/kanban/selectors';
import {Button, Form, Input, Select} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    MOVE_COLUMN_TASKS_FORM,
    MOVE_COLUMN_TASKS_FORM_LABELS,
} from './constants';
import {
    MoveColumnTasksFormProps,
    MoveColumnTasksFormValues,
} from './interfaces';
import styles from './styles.module.scss';

export const MoveColumnTasksForm = ({
    sourceColumn,
    onCloseForm,
    onSubmitForm,
}: MoveColumnTasksFormProps) => {
    const dispatch = useDispatch();

    const kanbanColumns = useSelector(selectKanbanColumns);

    const optionColumns = kanbanColumns.filter(
        (column) => column._id !== sourceColumn,
    );

    const [form] = useForm<MoveColumnTasksFormValues>();

    const onFinish = (values: Required<MoveColumnTasksFormValues>) => {
        onSubmitForm?.();

        dispatch(
            moveColumnTasks({sourceColumn, destinationColumn: values.column}),
        );
    };

    return (
        <Form
            name="moveColumnTasks"
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
            className={styles.moveColumnTasksForm}
        >
            <div className={styles.moveColumnTasksFormContent}>
                <Form.Item<MoveColumnTasksFormValues>
                    label={
                        MOVE_COLUMN_TASKS_FORM_LABELS[
                            MOVE_COLUMN_TASKS_FORM.column
                        ]
                    }
                    name={MOVE_COLUMN_TASKS_FORM.column}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    initialValue={optionColumns[0]?._id}
                    required={true}
                >
                    <Select>
                        {optionColumns.map((column) => (
                            <Select.Option value={column._id} key={column._id}>
                                <ColorOption
                                    colorRGB={column.color}
                                    description={column.title}
                                />
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>

            <div className={styles.moveColumnTasksFormButtons}>
                <Button htmlType="submit" type="primary">
                    Переместить
                </Button>

                <Button
                    onClick={() => {
                        form.resetFields();
                        onCloseForm?.();
                    }}
                >
                    Отмена
                </Button>
            </div>
        </Form>
    );
};
