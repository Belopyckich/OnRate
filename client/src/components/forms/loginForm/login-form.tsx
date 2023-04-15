import Icon from '@ant-design/icons';
import LogoIcon from '@src/assets/logo.component.svg';
import {validateEmail} from '@src/helpers/validators/validators';
import {AuthForm} from '@src/pages/AuthPage/constants';
import {loginUser} from '@src/redux/app/actions';
import {Button, Form, Input} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React from 'react';
import {useDispatch} from 'react-redux';

import {AUTH_FORM_FIELDS, AUTH_FORM_PLACEHOLDERS} from './constants';
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
                <Input
                    placeholder={AUTH_FORM_PLACEHOLDERS[AUTH_FORM_FIELDS.email]}
                    allowClear={true}
                />
            </Form.Item>

            <Form.Item
                name={AUTH_FORM_FIELDS.password}
                rules={[
                    {
                        required: true,
                        message:
                            AUTH_FORM_PLACEHOLDERS[AUTH_FORM_FIELDS.password],
                    },
                ]}
            >
                <Input.Password
                    placeholder={
                        AUTH_FORM_PLACEHOLDERS[AUTH_FORM_FIELDS.password]
                    }
                    allowClear={true}
                />
            </Form.Item>

            <Button htmlType="submit" type="primary">
                Вход
            </Button>

            <div className={styles.loginFormDescription}>Забыли пароль ?</div>

            <Button type="link" onClick={() => setAuthForm(AuthForm.SignIn)}>
                Регистрация
            </Button>
        </Form>
    );
};
