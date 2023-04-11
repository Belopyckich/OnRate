import ColorPicker from '@src/components/dialogs/colorPicker/color-picker';
import {createKanbanColumn, editKanbanColumn} from '@src/redux/kanban/actions';
import {Button, Form, Input} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React from 'react';
import {useDispatch} from 'react-redux';

import {KANBAN_TASK_FORM, KANBAN_TASK_FORM_LABELS} from './constants';
import {
    KanbanEditOrCreateTaskFormProps,
    KanbanTaskFormValues,
    TaskFormType,
} from './interfaces';
import styles from './styles.module.scss';

export const KanbanEditOrCreateTaskForm = ({
    onSubmitForm,
    onCloseForm,
    type,
    _id,
    initialValue,
}: KanbanEditOrCreateTaskFormProps) => {
    const dispatch = useDispatch();

    const [form] = useForm<KanbanTaskFormValues>();

    const onFinish = (values: KanbanTaskFormValues) => {
        onSubmitForm?.();

        if (type === TaskFormType.Create) {
            dispatch(createKanbanColumn(values));
        } else {
            dispatch(
                editKanbanColumn({
                    ...values,
                    _id,
                }),
            );
        }
    };

    return (
        <Form
            name="kanbanTask"
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
            className={styles.kanbanEditOrCreateForm}
        >
            <div className={styles.kanbanEditOrCreateFormContent}>
                <Form.Item<KanbanTaskFormValues>
                    label={KANBAN_TASK_FORM_LABELS[KANBAN_TASK_FORM.title]}
                    name={KANBAN_TASK_FORM.title}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    initialValue={initialValue?.title}
                    required={true}
                >
                    <Input allowClear={true} />
                </Form.Item>

                <Form.Item<KanbanTaskFormValues>
                    initialValue={initialValue?.description}
                    label={
                        KANBAN_TASK_FORM_LABELS[KANBAN_TASK_FORM.description]
                    }
                    name={KANBAN_TASK_FORM.description}
                    required={true}
                >
                    <Input allowClear={true} />
                </Form.Item>
            </div>

            <div className={styles.kanbanEditOrCreateFormButtons}>
                <Form.Item
                    noStyle
                    shouldUpdate={(
                        previous: KanbanTaskFormValues,
                        current: KanbanTaskFormValues,
                    ) => previous !== current}
                >
                    {({getFieldsValue}) => (
                        <Button
                            htmlType="submit"
                            type="primary"
                            disabled={
                                JSON.stringify(initialValue) ===
                                JSON.stringify(getFieldsValue())
                            }
                        >
                            Добавить
                        </Button>
                    )}
                </Form.Item>

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
