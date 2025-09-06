import React, { useEffect, useState } from 'react';
import styles from '../styles.module.scss';
import InputCommon from '@/pages/Login/components/InputCommon';
import Button from '@/components/Button/Button';
import authService from '@/apis/authService';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import userService from '@/apis/userService';

const FormLogin = () => {
    const {
        container,
        containerInput,
        containerBox,
        containerContent,
        textSpec,
        textMessageError,
        containerButton,
        textLink
    } = styles;

    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    // Schema cho đăng nhập
    const loginSchema = Yup.object({
        email: Yup.string()
            .email('Email không đúng định dạng.')
            .required('Email không được để trống.'),
        password: Yup.string().required('Mật khẩu không được để trống.')
    });

    // Schema cho  đăng ký
    const registerSchema = Yup.object({
        fullName: Yup.string()
            .min(2, 'Họ và tên phải có ít nhất 2 ký tự.')
            .required('Họ và tên không được để trống.'),
        numberOfPhone: Yup.string()
            .matches(
                /^(0[3|5|7|8|9])+([0-9]{8})\b/,
                'Số điện thoại không hợp lệ.'
            )
            .required('Số điện thoại không được để trống.'),
        email: Yup.string()
            .email('Email không đúng định dạng.')
            .required('Email không được để trống.'),
        password: Yup.string()
            .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
            .required('Mật khẩu không được để trống.'),
        cfmpassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp.')
            .required('Vui lòng xác nhận lại mật khẩu.')
    });

    const formik = useFormik({
        initialValues: {
            fullName: '',
            numberOfPhone: '',
            email: '',
            password: '',
            cfmpassword: ''
        },
        validationSchema: isRegister ? registerSchema : loginSchema,

        onSubmit: async values => {
            if (isLoading) return;
            const {
                fullName,
                numberOfPhone: phoneNumber,
                email,
                password
            } = values;
            setIsLoading(true);
            setErrorMessage('');

            //sự kiện đăng nhập
            if (!isRegister) {
                try {
                    const response = await authService.login({
                        email,
                        password
                    });

                    const token = response.data.result.token;
                    Cookies.set('token', token);

                    setErrorMessage('Đăng nhập thành công!');
                } catch (error) {
                    if (error.response) {
                        // Lỗi do server trả về (4xx, 5xx)
                        setErrorMessage('Thông tin đăng nhập không hợp lệ.');
                        console.log(error.response.data);
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
            }

            //sự kiện đăng ký
            if (isRegister) {
                try {
                    const response = await userService.add({
                        fullName,
                        phoneNumber,
                        email,
                        password
                    });

                    console.log(response.data);
                } catch (error) {
                    if (error.response) {
                        setErrorMessage(error.response.data.message);
                    } else {
                        setErrorMessage('Không thể kết nối đến máy chủ.');
                    }
                } finally {
                    setIsLoading(false);
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 5000);
                }
            }
        }
    });

    return (
        <div className={container}>
            <div className={containerContent}>
                <div>
                    <h2>Đăng nhập tài khoản</h2>
                    <p style={{ textAlign: 'center', fontSize: '14px' }}>
                        {!isRegister ? (
                            <div>
                                Bạn chưa có tài khoản ?{' '}
                                <span
                                    className={textLink}
                                    onClick={() => {
                                        setIsRegister(true);
                                    }}
                                >
                                    Đăng ký tại đây
                                </span>{' '}
                            </div>
                        ) : (
                            <div>
                                Bạn đã có tài khoản ?{' '}
                                <span
                                    className={textLink}
                                    onClick={() => {
                                        setIsRegister(false);
                                    }}
                                >
                                    Đăng nhập tại đây
                                </span>{' '}
                            </div>
                        )}
                    </p>
                    {errorMessage && (
                        <p className={textMessageError}>{errorMessage}</p>
                    )}
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={containerInput}>
                        {isRegister && (
                            <InputCommon
                                id='fullName'
                                label={'Họ và tên'}
                                type={'text'}
                                formik={formik}
                            />
                        )}
                        {isRegister && (
                            <InputCommon
                                id='numberOfPhone'
                                label={'Số điện thoại'}
                                type={'text'}
                                formik={formik}
                            />
                        )}
                        <InputCommon
                            id='email'
                            label={'Email'}
                            type={'email'}
                            formik={formik}
                        />
                        <InputCommon
                            id='password'
                            label={'Mật khẩu'}
                            type={'password'}
                            formik={formik}
                        />
                        {isRegister && (
                            <InputCommon
                                id='cfmpassword'
                                label={'Xác nhận mật khẩu'}
                                type={'password'}
                                formik={formik}
                            />
                        )}
                    </div>
                    {!isRegister && (
                        <p style={{ textAlign: 'center' }}>
                            Quên mật khẩu? <span>Nhấn vào đây</span>
                        </p>
                    )}
                    <div className={containerButton}>
                        <div style={{ width: '320px' }}>
                            <Button
                                content={
                                    isLoading
                                        ? 'Loading...'
                                        : isRegister
                                        ? 'Đăng ký'
                                        : 'Đăng nhập'
                                }
                                type='submit'
                            />
                        </div>
                    </div>
                </form>

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
