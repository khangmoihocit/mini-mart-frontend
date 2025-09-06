import React, { useEffect, useState } from 'react';
import styles from '../styles.module.scss';
import InputCommon from '@/pages/Login/components/InputCommon';
import Button from '@/components/Button/Button';
import { login } from '@/apis/authService';
import Cookies from 'js-cookie';

const FormLogin = () => {
    const {
        container,
        containerInput,
        containerBox,
        containerContent,
        textSpec,
        textMessageError
    } = styles;

    const [loginRequest, setLoginRequest] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await login(loginRequest);

            const token = response.data.result.token;
            Cookies.set('token', token);

            setErrorMessage('Đăng nhập thành công!');
        } catch (error) {
            if (error.response) {
                // Lỗi do server trả về (4xx, 5xx)
                if(error.response.data.code === 2003 || error.response.data.code === 2004){
                    setErrorMessage("Thông tin đăng nhập không hợp lệ.");
                }
                console.log(error.response.data);
                // Lấy message từ API và set vào state để hiển thị
                setErrorMessage(error.response.data.message);
            } else {
                // Lỗi mạng hoặc các lỗi khác
                console.error('Lỗi kết nối:', error.message);
                setErrorMessage('Không thể kết nối đến máy chủ.');
            }
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    return (
        <div className={container}>
            <div className={containerContent}>
                <div>
                    <h2>Đăng nhập tài khoản</h2>
                    <p style={{ textAlign: 'center', fontSize: '14px' }}>
                        Bạn chưa có tài khoản ? <span>Đăng ký tại đây</span>{' '}
                    </p>
                    {errorMessage && (
                        <p className={textMessageError}>{errorMessage}</p>
                    )}
                </div>
                <div className={containerInput}>
                    <InputCommon
                        label={'Email'}
                        type={'email'}
                        name='email'
                        value={loginRequest.email}
                        request={loginRequest}
                        setRequest={setLoginRequest}
                    />
                    <InputCommon
                        label={'Mật khẩu'}
                        type={'password'}
                        name='password'
                        value={loginRequest.password}
                        request={loginRequest}
                        setRequest={setLoginRequest}
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
