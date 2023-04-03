import {validateEmail} from '@src/helpers/validators/validators';
import {AuthForm} from '@src/pages/AuthPage/constants';
import {loginUser, registrateUser} from '@src/redux/app/actions';
import {selectCurrentUser} from '@src/redux/app/selectors';
import {Button, Form, Input} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    USER_SETTINGS_FORM_FIELDS,
    USER_SETTINGS_FORM_LABELS,
} from './constants';
import {getUserSettingsFormPlaceholder} from './helpers';
import {UserSettingsFormValues} from './interfaces';
import styles from './styles.module.scss';

export const UserSettingsForm = () => {
    const dispatch = useDispatch();

    const user = useSelector(selectCurrentUser);

    const [form] = useForm<UserSettingsFormValues>();

    const onFinish = (formValues: UserSettingsFormValues) => {
        console.log(formValues, 'formValues');
    };

    return (
        <Form
            name="userSettingsForm"
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
            className={styles.userSettingsForm}
        >
            <div className={styles.userSettingsFormContent}>
                <Form.Item
                    label={
                        USER_SETTINGS_FORM_LABELS[
                            USER_SETTINGS_FORM_FIELDS.picture
                        ]
                    }
                    name={USER_SETTINGS_FORM_FIELDS.picture}
                    rules={[
                        {
                            required: true,
                            message: getUserSettingsFormPlaceholder(
                                USER_SETTINGS_FORM_FIELDS.picture,
                            ),
                        },
                    ]}
                >
                    <Input allowClear={true} />
                </Form.Item>

                <Form.Item
                    label={
                        USER_SETTINGS_FORM_LABELS[
                            USER_SETTINGS_FORM_FIELDS.name
                        ]
                    }
                    initialValue={user?.name}
                    name={USER_SETTINGS_FORM_FIELDS.name}
                    rules={[
                        {
                            required: true,
                            message: getUserSettingsFormPlaceholder(
                                USER_SETTINGS_FORM_FIELDS.name,
                            ),
                        },
                    ]}
                >
                    <Input allowClear={true} />
                </Form.Item>

                <Form.Item
                    label={
                        USER_SETTINGS_FORM_LABELS[
                            USER_SETTINGS_FORM_FIELDS.email
                        ]
                    }
                    name={USER_SETTINGS_FORM_FIELDS.email}
                    initialValue={user?.email}
                    rules={[
                        {
                            required: true,
                            message: getUserSettingsFormPlaceholder(
                                USER_SETTINGS_FORM_FIELDS.email,
                            ),
                        },
                    ]}
                >
                    <Input allowClear={true} disabled={true} />
                </Form.Item>

                <Form.Item
                    label={
                        USER_SETTINGS_FORM_LABELS[
                            USER_SETTINGS_FORM_FIELDS.country
                        ]
                    }
                    name={USER_SETTINGS_FORM_FIELDS.country}
                    initialValue={user?.location?.country}
                    rules={[
                        {
                            required: true,
                            message: getUserSettingsFormPlaceholder(
                                USER_SETTINGS_FORM_FIELDS.country,
                            ),
                        },
                    ]}
                >
                    <Input allowClear={true} />
                </Form.Item>

                <Form.Item
                    label={
                        USER_SETTINGS_FORM_LABELS[
                            USER_SETTINGS_FORM_FIELDS.city
                        ]
                    }
                    name={USER_SETTINGS_FORM_FIELDS.city}
                    initialValue={user?.location?.city}
                    rules={[
                        {
                            required: true,
                            message: getUserSettingsFormPlaceholder(
                                USER_SETTINGS_FORM_FIELDS.city,
                            ),
                        },
                    ]}
                >
                    <Input allowClear={true} />
                </Form.Item>

                <Form.Item
                    label={
                        USER_SETTINGS_FORM_LABELS[
                            USER_SETTINGS_FORM_FIELDS.date
                        ]
                    }
                    initialValue={user?.dob?.date}
                    name={USER_SETTINGS_FORM_FIELDS.date}
                    rules={[
                        {
                            required: true,
                            message: getUserSettingsFormPlaceholder(
                                USER_SETTINGS_FORM_FIELDS.date,
                            ),
                        },
                    ]}
                >
                    <Input allowClear={true} />
                </Form.Item>

                <Form.Item
                    label={
                        USER_SETTINGS_FORM_LABELS[USER_SETTINGS_FORM_FIELDS.age]
                    }
                    initialValue={user?.dob?.age}
                    name={USER_SETTINGS_FORM_FIELDS.age}
                    rules={[
                        {
                            required: true,
                            message: getUserSettingsFormPlaceholder(
                                USER_SETTINGS_FORM_FIELDS.age,
                            ),
                        },
                    ]}
                >
                    <Input allowClear={true} />
                </Form.Item>
            </div>

            <Button htmlType="submit">Обновить данные</Button>
        </Form>
    );
};
