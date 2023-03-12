import {AuthForm} from '@src/components/forms/auth-form';
import React from 'react';

import styles from './styles.module.scss';

const AuthPage = () => (
    <div className={styles.mainPage}>
        <AuthForm />
    </div>
);

export default AuthPage;
