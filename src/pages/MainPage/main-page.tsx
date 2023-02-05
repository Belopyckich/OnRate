import {AuthForm} from '@src/components/forms/auth-form';
import {Form, Layout} from 'antd';
import React from 'react';

import styles from './styles.module.scss';

const {Footer, Content} = Layout;

const MainPage = () => {
    console.log('app');
    return (
        <div className={styles.mainPage}>
            <AuthForm />
        </div>
    );
};

export default MainPage;
