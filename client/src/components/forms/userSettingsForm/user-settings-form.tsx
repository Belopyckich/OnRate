import {
    ScrollContainer,
    ScrollMode,
} from '@src/components/scrollContainer/scroll-container';
import {UserPhotoUpload} from '@src/components/uploader/upload';
import {UserPhoto} from '@src/components/userPhoto/user-photo';
import {UserPhotoEditMask} from '@src/components/userPhotoEditMask/user-photo-edit-mask';
import {CITIES, Countries} from '@src/constants/locations/locations';
import {
    selectCurrentUser,
    selectCurrentUserForSettings,
} from '@src/redux/app/selectors';
import {getUsers} from '@src/redux/randomUsers/actions';
import {Button, DatePicker, Form, Input, Select} from 'antd';
import {useForm} from 'antd/es/form/Form';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
    USER_SETTINGS_FORM_FIELDS,
    USER_SETTINGS_FORM_LABELS,
} from './constants';
import {
    getUserSettingsFormPlaceholder,
    shouldUpdateUserSettingsField,
    shouldUpdateUserSettingsLocationField,
} from './helpers';
import {UserSettingsFormValues} from './interfaces';
import styles from './styles.module.scss';

export const UserSettingsForm = () => {
    const dispatch = useDispatch();

    const user = useSelector(selectCurrentUserForSettings);

    const [form] = useForm<UserSettingsFormValues>();

    const {setFieldsValue} = form;

    const onFinish = (formValues: UserSettingsFormValues) => {
        console.log(formValues, 'formValues');
    };

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const t = Object.keys(Countries).map((value) => ({
        value: value,
        label: value,
    }));

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
                        initialValue={user?.picture.src}
                    >
                        {({getFieldsValue, setFieldsValue}) => {
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
                                        src={picture?.src}
                                        canManipulate={true}
                                        uploadFile={(props) =>
                                            setFieldsValue({
                                                picture: props,
                                            })
                                        }
                                        deleteFile={() =>
                                            setFieldsValue({
                                                picture: undefined,
                                            })
                                        }
                                        style={{
                                            width: '160px',
                                            height: '160px',
                                            fontSize: '160px',
                                        }}
                                    >
                                        <UserPhoto
                                            username={name}
                                            src={picture?.src}
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
                        noStyle
                        shouldUpdate={shouldUpdateUserSettingsLocationField(
                            setFieldsValue,
                        )}
                    >
                        {({getFieldsValue}) => {
                            const {country} = getFieldsValue();

                            return (
                                <>
                                    <Form.Item
                                        label={
                                            USER_SETTINGS_FORM_LABELS[
                                                USER_SETTINGS_FORM_FIELDS
                                                    .country
                                            ]
                                        }
                                        name={USER_SETTINGS_FORM_FIELDS.country}
                                        initialValue={
                                            user?.location?.country ||
                                            Countries.Belarus
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    getUserSettingsFormPlaceholder(
                                                        USER_SETTINGS_FORM_FIELDS.country,
                                                    ),
                                            },
                                        ]}
                                    >
                                        <Select
                                            allowClear={true}
                                            options={Object.keys(Countries).map(
                                                (value) => ({
                                                    value: value,
                                                    label: value,
                                                }),
                                            )}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={
                                            USER_SETTINGS_FORM_LABELS[
                                                USER_SETTINGS_FORM_FIELDS.city
                                            ]
                                        }
                                        name={USER_SETTINGS_FORM_FIELDS.city}
                                        initialValue={
                                            user?.location?.city ||
                                            CITIES[Countries.Belarus]
                                        }
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    getUserSettingsFormPlaceholder(
                                                        USER_SETTINGS_FORM_FIELDS.city,
                                                    ),
                                            },
                                        ]}
                                    >
                                        <Select
                                            allowClear={true}
                                            options={
                                                country
                                                    ? CITIES[country].map(
                                                          (value) => ({
                                                              value: value,
                                                              label: value,
                                                          }),
                                                      )
                                                    : CITIES[
                                                          Countries.Belarus
                                                      ].map((value) => ({
                                                          value: value,
                                                          label: value,
                                                      }))
                                            }
                                        />
                                    </Form.Item>
                                </>
                            );
                        }}
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
