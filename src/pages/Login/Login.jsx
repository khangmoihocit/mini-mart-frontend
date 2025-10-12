import { UserInfoProvider } from '@/contexts/UserInfoProvider';
import FormLogin from '@/pages/Login/components/FormLogin';
import React from 'react';

const Login = () => {
    return (
        <UserInfoProvider>
            <FormLogin />
        </UserInfoProvider>
    );
};

export default Login;
