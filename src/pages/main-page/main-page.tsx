import { Header } from '@components/main-page/header/header';
import { Aside } from '@components/main-page/sider/sider';
import React from 'react';

import { Loader } from '@components/loader/loader';
import { Footer } from '@components/main-page/footer/footer';
import { Main } from '@components/main-page/main/main';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isUserAuthenticated } from '@utils/storage';
import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import { Navigate } from 'react-router-dom';
import s from './main-page.module.scss';

const backgroundImage = '/Main_page_light.png';

export const MainPage: React.FC = () => {
    const loading = useAppSelector((state) => state.registration.loading);
    if (!isUserAuthenticated()) {
        console.log(isUserAuthenticated());
        return <Navigate to='/auth' />;
    }

    return (
        <>
            {loading && <Loader />}
            <Layout
                className={s.general_wrapper}
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'top',
                }}
            >
                <Aside />
                <Layout className={s.main_container}>
                    <Header />
                    <Content>
                        <Main />
                    </Content>
                    <Footer />
                </Layout>
            </Layout>
        </>
    );
};
