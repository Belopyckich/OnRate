import {validateEmail} from '@src/helpers/validators/validators';
import {AuthForm} from '@src/pages/AuthPage/constants';
import {loginUser, registrateUser} from '@src/redux/app/actions';
import {Button, Form, Input} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React from 'react';
import {useDispatch} from 'react-redux';

import {
    SIGNUP_FORM_FIELDS,
    SIGNUP_FORM_LABELS,
    SIGNUP_FORM_PLACEHOLDERS,
} from './constants';
import {LoginFormProps, RegistrateUserForm} from './interfaces';
import styles from './styles.module.scss';

export const RegistrationForm = ({setAuthForm}: LoginFormProps) => {
    const dispatch = useDispatch();

    const [form] = useForm<RegistrateUserForm>();

    const onFinish = (formValues: RegistrateUserForm) => {
        dispatch(registrateUser(formValues));
    };

    return (
        <Form
            name="signupForm"
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
            className={styles.registrationForm}
        >
            <Form.Item
                label={SIGNUP_FORM_LABELS[SIGNUP_FORM_FIELDS.name]}
                name={SIGNUP_FORM_FIELDS.name}
                rules={[
                    {
                        required: true,
                        message:
                            SIGNUP_FORM_PLACEHOLDERS[SIGNUP_FORM_FIELDS.name],
                    },
                ]}
            >
                <Input allowClear={true} />
            </Form.Item>

            <Form.Item
                label={SIGNUP_FORM_LABELS[SIGNUP_FORM_FIELDS.email]}
                name={SIGNUP_FORM_FIELDS.email}
                rules={[
                    {
                        required: true,
                        message:
                            SIGNUP_FORM_PLACEHOLDERS[SIGNUP_FORM_FIELDS.email],
                    },
                    {
                        validator: validateEmail,
                    },
                ]}
            >
                <Input allowClear={true} />
            </Form.Item>

            <Form.Item
                label={SIGNUP_FORM_LABELS[SIGNUP_FORM_FIELDS.password]}
                name={SIGNUP_FORM_FIELDS.password}
                rules={[
                    {
                        required: true,
                        message:
                            SIGNUP_FORM_PLACEHOLDERS[
                                SIGNUP_FORM_FIELDS.password
                            ],
                    },
                ]}
            >
                <Input.Password allowClear={true} />
            </Form.Item>

            <Button htmlType="submit">Sign Up</Button>

            <div className={styles.registrationFormDescription}>
                Do you have an account?
                <Button type="link" onClick={() => setAuthForm(AuthForm.LogIn)}>
                    Log in
                </Button>
            </div>
        </Form>
    );
};
