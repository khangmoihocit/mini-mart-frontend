import React from 'react';
import styles from '../styles.module.scss';
import InputCommon from './InputCommon/InputCommon';
import Button from '@/components/Button/Button';
import AuthHeader from './AuthHeader/AuthHeader';
import SocialLogin from './SocialLogin/SocialLogin';
import { useAuth } from '@/hooks/useAuth';
import { UI_MESSAGES } from '@/constants/messages';

const FormLogin = () => {
    const {
        container,
        containerInput,
        containerContent,
        containerButton,
        textLink
    } = styles;

    const {
        isRegister,
        isLoading,
        errorMessage,
        successMessage,
        formik,
        switchToRegister,
        switchToLogin
    } = useAuth();

    const handleSwitchMode = () => {
        if (isRegister) {
            switchToLogin();
        } else {
            switchToRegister();
        }
    };

    return (
        <div className={container}>
            <div className={containerContent}>
                <AuthHeader
                    isRegister={isRegister}
                    onSwitchMode={handleSwitchMode}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                />

                <form onSubmit={formik.handleSubmit}>
                    <div className={containerInput}>
                        {isRegister && (
                            <InputCommon
                                id="fullName"
                                label="Họ và tên"
                                type="text"
                                formik={formik}
                            />
                        )}
                        {isRegister && (
                            <InputCommon
                                id="numberOfPhone"
                                label="Số điện thoại"
                                type="text"
                                formik={formik}
                            />
                        )}
                        <InputCommon
                            id="email"
                            label="Email"
                            type="email"
                            formik={formik}
                        />
                        <InputCommon
                            id="password"
                            label="Mật khẩu"
                            type="password"
                            formik={formik}
                        />
                        {isRegister && (
                            <InputCommon
                                id="cfmpassword"
                                label="Xác nhận mật khẩu"
                                type="password"
                                formik={formik}
                            />
                        )}
                    </div>

                    {!isRegister && (
                        <p style={{ textAlign: 'center' }}>
                            {UI_MESSAGES.FORGOT_PASSWORD.split('Nhấn vào đây')[0]}
                            <span className={textLink}>Nhấn vào đây</span>
                        </p>
                    )}

                    <div className={containerButton}>
                        <div style={{ width: '320px' }}>
                            <Button
                                content={
                                    isLoading
                                        ? UI_MESSAGES.LOADING
                                        : isRegister
                                        ? 'Đăng ký'
                                        : 'Đăng nhập'
                                }
                                type="submit"
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </form>

                <SocialLogin />
            </div>
        </div>
    );
};

export default FormLogin;
