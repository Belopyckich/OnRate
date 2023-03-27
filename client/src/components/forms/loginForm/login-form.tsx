import Icon from '@ant-design/icons';
import LogoIcon from '@src/assets/logo.component.svg';
import {validateEmail} from '@src/helpers/validators/validators';
import {AuthForm} from '@src/pages/AuthPage/constants';
import {loginUser} from '@src/redux/app/actions';
import {Button, Form, Input} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React from 'react';
import {useDispatch} from 'react-redux';

import {
    AUTH_FORM_FIELDS,
    AUTH_FORM_LABELS,
    AUTH_FORM_PLACEHOLDERS,
} from './constants';
import {LoginFormProps, UserForm} from './interfaces';
import styles from './styles.module.scss';

export const LoginForm = ({setAuthForm}: LoginFormProps) => {
    const dispatch = useDispatch();

    const [form] = useForm<UserForm>();

    const onFinish = (formValues: UserForm) => {
        dispatch(loginUser(formValues));
    };

    return (
        <Form
            name="authForm"
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
            className={styles.loginForm}
        >
            <Form.Item
                label={AUTH_FORM_LABELS[AUTH_FORM_FIELDS.email]}
                name={AUTH_FORM_FIELDS.email}
                rules={[
                    {
                        required: true,
                        message: AUTH_FORM_PLACEHOLDERS[AUTH_FORM_FIELDS.email],
                    },
                    {
                        validator: validateEmail,
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
                            AUTH_FORM_PLACEHOLDERS[AUTH_FORM_FIELDS.password],
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Button htmlType="submit">Log In</Button>

            <div className={styles.loginFormDescription}>
                Don’t have an account?
                <Button
                    type="link"
                    onClick={() => setAuthForm(AuthForm.SignIn)}
                >
                    Sign up
                </Button>
            </div>
        </Form>
    );
};
