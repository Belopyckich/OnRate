import {UserSettingsForm} from '@src/components/forms/userSettingsForm/user-settings-form';
import {Card} from 'antd';
import React from 'react';

import styles from './styles.module.scss';

const UserSettingsPage = () => (
    <Card>
        <div className={styles.userSettingsPage}>
            <UserSettingsForm />
        </div>
    </Card>
);

export default UserSettingsPage;
