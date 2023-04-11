import ColorPicker from '@src/components/dialogs/colorPicker/color-picker';
import {createKanbanColumn, editKanbanColumn} from '@src/redux/kanban/actions';
import {Button, Form, Input} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React from 'react';
import {useDispatch} from 'react-redux';

import {KANBAN_COLUMN_FORM, KANBAN_COLUMN_FORM_LABELS} from './constants';
import {
    ColumnFormType,
    KanbanColumnFormValues,
    KanbanEditOrCreateColumnFormProps,
} from './interfaces';
import styles from './styles.module.scss';

export const KanbanEditOrCreateColumnForm = ({
    onSubmitForm,
    onCloseForm,
    type,
    _id,
    initialValue,
}: KanbanEditOrCreateColumnFormProps) => {
    const dispatch = useDispatch();

    const [form] = useForm<KanbanColumnFormValues>();

    const onFinish = (values: KanbanColumnFormValues) => {
        onSubmitForm?.();

        if (type === ColumnFormType.Create) {
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
            name="kanbanColumn"
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
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
                    initialValue={initialValue?.title}
                    required={true}
                >
                    <Input allowClear={true} />
                </Form.Item>

                <ColorPicker
                    form={form}
                    initialValue={initialValue?.color}
                    label={KANBAN_COLUMN_FORM_LABELS[KANBAN_COLUMN_FORM.color]}
                    name={KANBAN_COLUMN_FORM.color}
                    required={true}
                />
            </div>

            <div className={styles.kanbanEditOrCreateFormButtons}>
                <Form.Item
                    noStyle
                    shouldUpdate={(
                        previous: KanbanColumnFormValues,
                        current: KanbanColumnFormValues,
                    ) => previous !== current}
                >
                    {({getFieldsValue}) => {
                        const currentValues = getFieldsValue();

                        const formatedCurrentValues = {
                            ...currentValues,
                            color: {
                                r: currentValues.color?.r,
                                g: currentValues.color?.g,
                                b: currentValues.color?.b,
                            },
                        };

                        return (
                            <Button
                                htmlType="submit"
                                type="primary"
                                disabled={
                                    JSON.stringify(initialValue) ===
                                    JSON.stringify(formatedCurrentValues)
                                }
                            >
                                Добавить
                            </Button>
                        );
                    }}
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
