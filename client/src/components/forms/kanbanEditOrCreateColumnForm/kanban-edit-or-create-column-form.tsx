import ColorPicker from '@src/components/dialogs/colorPicker/color-picker';
import {validateEmail} from '@src/helpers/validators/validators';
import {AuthForm} from '@src/pages/AuthPage/constants';
import {loginUser, registrateUser} from '@src/redux/app/actions';
import {createKanbanColumn} from '@src/redux/kanban/actions';
import {Button, Form, Input} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React from 'react';
import {useDispatch} from 'react-redux';

import {KANBAN_COLUMN_FORM, KANBAN_COLUMN_FORM_LABELS} from './constants';
import {
    KanbanColumnFormValues,
    KanbanEditOrCreateFormProps,
} from './interfaces';
import styles from './styles.module.scss';

export const KanbanEditOrCreateForm = ({
    initialValue,
    onSubmitForm,
    onCloseForm,
}: KanbanEditOrCreateFormProps) => {
    const dispatch = useDispatch();

    const [form] = useForm<KanbanColumnFormValues>();

    return (
        <Form
            name="kanbanColumn"
            form={form}
            autoComplete="off"
            onFinish={(values) => {
                onSubmitForm?.();
                dispatch(createKanbanColumn(values));
            }}
            layout="vertical"
            initialValues={initialValue}
            className={styles.kanbanEditOrCreateForm}
        >
            <div className={styles.kanbanEditOrCreateFormContent}>
                <Form.Item<KanbanColumnFormValues>
                    label={KANBAN_COLUMN_FORM_LABELS[KANBAN_COLUMN_FORM.title]}
                    name={KANBAN_COLUMN_FORM.title}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    required={true}
                >
                    <Input allowClear={true} />
                </Form.Item>

                <ColorPicker
                    form={form}
                    label={KANBAN_COLUMN_FORM_LABELS[KANBAN_COLUMN_FORM.color]}
                    name={KANBAN_COLUMN_FORM.color}
                    required={true}
                />
            </div>

            <div className={styles.kanbanEditOrCreateFormButtons}>
                <Button htmlType="submit" type="primary">
                    Добавить
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
