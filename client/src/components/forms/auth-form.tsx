import Icon from '@ant-design/icons';
import {loginUser} from '@src/redux/app/actions';
import {Button, Form, Input} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React from 'react';
import {useDispatch} from 'react-redux';

import LogoIcon from '../../assets/logo.component.svg';
import {
    AUTH_FORM_FIELDS,
    AUTH_FORM_LABELS,
    AUTH_FORM_PLACEHOLDERS,
} from './constants';
import {UserForm} from './interfaces';
import styles from './styles.module.scss';

export const AuthForm = () => {
    const dispatch = useDispatch();

    const [form] = useForm<UserForm>();

    const onFinish = (formValues: UserForm) => {
        dispatch(loginUser(formValues));
    };

    return (
        <div className={styles.authForm}>
            <Icon component={LogoIcon} className={styles.authFormLogo} />

            <div className={styles.authFormTitle}>Autorization</div>

            <Form
                name="authForm"
                form={form}
                autoComplete="off"
                onFinish={onFinish}
                layout="vertical"
                className={styles.authFormContent}
            >
                <Form.Item
                    label={AUTH_FORM_LABELS[AUTH_FORM_FIELDS.email]}
                    name={AUTH_FORM_FIELDS.email}
                    rules={[
                        {
                            required: true,
                            message:
                                AUTH_FORM_PLACEHOLDERS[AUTH_FORM_FIELDS.email],
                        },
                    ]}
                >
                    <Input allowClear={true} />
                </Form.Item>

                <Form.Item
                    label={AUTH_FORM_LABELS[AUTH_FORM_FIELDS.password]}
                    name={AUTH_FORM_FIELDS.password}
                    rules={[
                        {
                            required: true,
                            message:
                                AUTH_FORM_PLACEHOLDERS[
                                    AUTH_FORM_FIELDS.password
                                ],
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Button htmlType="submit">Log In</Button>

                <Button type="primary">Sign Up</Button>
            </Form>
        </div>
    );
};
