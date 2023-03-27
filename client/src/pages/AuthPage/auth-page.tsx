import Icon from '@ant-design/icons';
import LogoIcon from '@src/assets/logo.component.svg';
import {LoginForm} from '@src/components/forms/loginForm/login-form';
import {RegistrationForm} from '@src/components/forms/registrationForm/registration-form';
import React, {useState} from 'react';

import {AuthForm} from './constants';
import styles from './styles.module.scss';

const AuthPage = () => {
    const [authForm, setAuthForm] = useState(AuthForm.LogIn);

    return (
        <div className={styles.authPage}>
            <div className={styles.authPageForm}>
                <Icon component={LogoIcon} className={styles.authPageLogo} />

                <div className={styles.authPageTitle}>Autorization</div>

                {authForm === AuthForm.LogIn ? (
                    <LoginForm setAuthForm={setAuthForm} />
                ) : (
                    <RegistrationForm setAuthForm={setAuthForm} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;
