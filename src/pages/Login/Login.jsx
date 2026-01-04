import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { UserInfoProvider } from '@/contexts/UserInfoProvider';
import FormLogin from '@/pages/Login/components/FormLogin';
import React from 'react';

const Login = () => {
    return (
        <div style={{position: 'relative'}}>
            <Header />
            <FormLogin />
            <Footer/>
        </div>
    );
};

export default Login;
