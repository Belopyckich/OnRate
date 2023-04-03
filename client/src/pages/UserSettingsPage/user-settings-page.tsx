import {UserSettingsForm} from '@src/components/forms/userSettingsForm/user-settings-form';
import {APP_ROUTES} from '@src/constants';
import {Card} from 'antd';
import React from 'react';

import styles from './styles.module.scss';

const UserSettingsPage = () => (
    <Card className={styles.userSettingsPage}>
        <UserSettingsForm />
    </Card>
);

export default UserSettingsPage;
