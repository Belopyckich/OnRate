import {Layout} from 'antd';
import React from 'react';

import styles from './styles.module.scss';

const {Footer, Content} = Layout;

const MainPage = () => {
    console.log('app');
    return (
        <Layout className={styles.mainLayout}>
            <Content>Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    );
};

export default MainPage;
