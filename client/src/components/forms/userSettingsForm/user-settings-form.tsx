import {UserPhotoUpload} from '@src/components/uploader/upload';
import {UserPhoto} from '@src/components/userPhoto/user-photo';
import {UserPhotoEditMask} from '@src/components/userPhotoEditMask/user-photo-edit-mask';
import {DATE_FORMAT} from '@src/constants/date-formats';
import {CITIES, Country} from '@src/constants/locations/locations';
import {updateUser} from '@src/redux/app/actions';
import {User} from '@src/redux/app/interfaces';
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
    MIN_AGE_DIFFERENCE,
    USER_PHOTO_SETTINGS_STYLES,
    USER_SETTINGS_FORM_FIELDS,
    USER_SETTINGS_FORM_LABELS,
} from './constants';
import {
    getUserSettingsFormPlaceholder,
    getUserSettingsFormValues,
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

    const onFinish = (formValues: UserSettingsFormValues) =>
        user &&
        dispatch(
            updateUser({
                user: {...formValues, id: user.id},
                callback: (user: User) => {
                    const userSettingsFormValues =
                        getUserSettingsFormValues(user);

                    if (userSettingsFormValues) {
                        setFieldsValue(userSettingsFormValues);
                    }
                },
            }),
        );

    return (
        <Form
            name="userSettingsForm"
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
            initialValues={user}
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
                        {({getFieldValue}) => {
                            const picture = getFieldValue(
                                USER_SETTINGS_FORM_FIELDS.picture,
                            );
                            const name = getFieldValue(
                                USER_SETTINGS_FORM_FIELDS.name,
                            );

                            return (
                                <Form.Item<UserSettingsFormValues>
                                    noStyle
                                    name={USER_SETTINGS_FORM_FIELDS.picture}
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
                                                picture: null,
                                            })
                                        }
                                        style={USER_PHOTO_SETTINGS_STYLES}
                                    >
                                        <UserPhoto
                                            username={name}
                                            src={picture?.src}
                                            style={USER_PHOTO_SETTINGS_STYLES}
                                        />
                                    </UserPhotoEditMask>
                                </Form.Item>
                            );
                        }}
                    </Form.Item>

                    <Form.Item<UserSettingsFormValues>
                        label={
                            USER_SETTINGS_FORM_LABELS[
                                USER_SETTINGS_FORM_FIELDS.name
                            ]
                        }
                        name={USER_SETTINGS_FORM_FIELDS.name}
                        rules={[
                            {
                                required: true,
                                message: getUserSettingsFormPlaceholder(
                                    USER_SETTINGS_FORM_FIELDS.name,
                                ),
                            },
                        ]}
                        required={true}
                    >
                        <Input allowClear={true} />
                    </Form.Item>
                </div>

                <Form.Item<UserSettingsFormValues>
                    label={
                        USER_SETTINGS_FORM_LABELS[
                            USER_SETTINGS_FORM_FIELDS.email
                        ]
                    }
                    name={USER_SETTINGS_FORM_FIELDS.email}
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
                                    <Form.Item<UserSettingsFormValues>
                                        label={
                                            USER_SETTINGS_FORM_LABELS[
                                                USER_SETTINGS_FORM_FIELDS
                                                    .country
                                            ]
                                        }
                                        name={USER_SETTINGS_FORM_FIELDS.country}
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
                                            options={Object.keys(Country).map(
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
                                                          Country.Belarus
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

                <Form.Item<UserSettingsFormValues>
                    label={
                        USER_SETTINGS_FORM_LABELS[USER_SETTINGS_FORM_FIELDS.dob]
                    }
                    name={USER_SETTINGS_FORM_FIELDS.dob}
                    rules={[
                        {
                            required: true,
                            message: getUserSettingsFormPlaceholder(
                                USER_SETTINGS_FORM_FIELDS.dob,
                            ),
                        },
                    ]}
                >
                    <DatePicker
                        disabledDate={(currentDate) =>
                            currentDate.year() < MIN_AGE_DIFFERENCE
                        }
                    />
                </Form.Item>
            </div>

            <Button htmlType="submit">Обновить данные</Button>
        </Form>
    );
};
