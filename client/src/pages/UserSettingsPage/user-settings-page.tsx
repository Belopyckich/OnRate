import UserSettingsDescriptionIcon from '@src/assets/user-settings-description.component.svg';
import {UserSettingsForm} from '@src/components/forms/userSettingsForm/user-settings-form';
import {Card} from 'antd';
import React from 'react';

import styles from './styles.module.scss';

const UserSettingsPage = () => (
    <Card>
        <div className={styles.userSettingsPage}>
            <UserSettingsForm />

            <div className={styles.userSettingsPageDescription}>
                <UserSettingsDescriptionIcon />

                <div className={styles.userSettingsPageDescriptionText}>
                    Здесь вы можете настроить основную информацию своей учетной
                    записи.
                </div>
            </div>
        </div>
    </Card>
);

export default UserSettingsPage;
