import {UserPhoto} from '@src/components/userPhoto/user-photo';
import {UserPhotoEditMask} from '@src/components/userPhotoEditMask/user-photo-edit-mask';
import {validateEmail} from '@src/helpers/validators/validators';
import {AuthForm} from '@src/pages/AuthPage/constants';
import {loginUser, registrateUser} from '@src/redux/app/actions';
import {selectCurrentUser} from '@src/redux/app/selectors';
import {Button, DatePicker, Form, Input} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    USER_SETTINGS_FORM_FIELDS,
    USER_SETTINGS_FORM_LABELS,
} from './constants';
import {
    getUserSettingsFormPlaceholder,
    shouldUpdateUserSettingsField,
} from './helpers';
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
                <div className={styles.userSettingsFormPhotoAndName}>
                    <Form.Item
                        noStyle
                        shouldUpdate={shouldUpdateUserSettingsField([
                            USER_SETTINGS_FORM_FIELDS.picture,
                            USER_SETTINGS_FORM_FIELDS.name,
                        ])}
                    >
                        {({getFieldsValue}) => {
                            const {name, picture} = getFieldsValue();

                            return (
                                <Form.Item
                                    noStyle
                                    name={USER_SETTINGS_FORM_FIELDS.picture}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                getUserSettingsFormPlaceholder(
                                                    USER_SETTINGS_FORM_FIELDS.picture,
                                                ),
                                        },
                                    ]}
                                >
                                    <UserPhotoEditMask
                                        src={picture?.thumbnail}
                                        canManipulate={true}
                                        style={{
                                            width: '160px',
                                            height: '160px',
                                            fontSize: '160px',
                                        }}
                                    >
                                        <UserPhoto
                                            user={{
                                                name,
                                                picture,
                                            }}
                                            style={{
                                                width: '160px',
                                                height: '160px',
                                                fontSize: '160px',
                                            }}
                                        />
                                    </UserPhotoEditMask>
                                </Form.Item>
                            );
                        }}
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
                </div>

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

                <div className={styles.userSettingsFormLocation}>
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
                </div>

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
                    <DatePicker
                        onChange={(value) => console.log(value, 'onChange')}
                        onOk={(value) => console.log(value, 'onOk')}
                        popupClassName={styles.userSettingsFormDatePicker}
                    />
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
