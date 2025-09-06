import React, { useState } from 'react';
import styles from '../styles.module.scss';
import InputCommon from '@/pages/Login/components/InputCommon';
import Button from '@/components/Button/Button';
import { login } from '@/apis/authService';

const FormLogin = () => {
    const {
        container,
        containerInput,
        containerBox,
        containerContent,
        textSpec
    } = styles;

    const [loginRequest, setLoginRequest] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            await login(loginRequest)
                .then(response => {
                    console.log('login success: ', response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('loi login: ', error.response.data);
                    setIsLoading(false);
                });
        } catch (err) {
            setIsLoading(false);
        }
    };

    return (
        <div className={container}>
            <div className={containerContent}>
                <div>
                    <h2>Đăng nhập tài khoản</h2>
                    <p>
                        Bạn chưa có tài khoản ? <span>Đăng ký tại đây</span>{' '}
                    </p>
                </div>
                <div className={containerInput}>
                    <InputCommon
                        label={'Email'}
                        type={'email'}
                        name='email'
                        value={loginRequest.email}
                        loginRequest={loginRequest}
                        setLoginRequest={setLoginRequest}
                    />
                    <InputCommon
                        label={'Mật khẩu'}
                        type={'password'}
                        name='password'
                        value={loginRequest.password}
                        loginRequest={loginRequest}
                        setLoginRequest={setLoginRequest}
                    />
                </div>
                <p>
                    Quên mật khẩu? <span>Nhấn vào đây</span>
                </p>
                <div style={{ width: '320px' }}>
                    <Button
                        content={isLoading ? 'Loading...' : 'Đăng nhập'}
                        onClick={handleLogin}
                    />
                </div>

                <div className={textSpec}>Hoặc đăng nhập bằng</div>
                <div className={containerBox}>
                    <img
                        width='139px'
                        height='36px'
                        src='https://theme.hstatic.net/200000888549/1001374142/14/gp-btn.svg?v=26'
                        alt='google'
                    />
                    <img
                        width='139px'
                        height='36px'
                        src='https://theme.hstatic.net/200000888549/1001374142/14/fb-btn.svg?v=26'
                        alt='facebook'
                    />
                </div>
            </div>
        </div>
    );
};

export default FormLogin;
