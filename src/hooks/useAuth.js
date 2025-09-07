import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

import authService from '@/apis/authService';
import userService from '@/apis/userService';
import { loginSchema, registerSchema } from '@/validations/authSchemas';
import { API_MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';

export const useAuth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const navigate = useNavigate();

    const clearMessages = () => {
        setTimeout(() => {
            setErrorMessage('');
            setSuccessMessage('');
        }, 5000);
    };

    const handleLogin = async (credentials) => {
        try {
            const response = await authService.login(credentials);
            const token = response.data.result.token;
            Cookies.set('token', token);
            navigate(ROUTES.ADMIN);
        } catch (error) {
            if (error.response) {
                setErrorMessage(API_MESSAGES.LOGIN.INVALID_CREDENTIALS);
            } else {
                console.error('Lỗi kết nối:', error.message);
                setErrorMessage(API_MESSAGES.LOGIN.CONNECTION_ERROR);
            }
        }
    };

    const handleRegister = async (userData) => {
        try {
            const { fullName, numberOfPhone: phoneNumber, email, password } = userData;
            await userService.add({
                fullName,
                phoneNumber,
                email,
                password
            });
            setSuccessMessage(API_MESSAGES.REGISTER.SUCCESS);
            setIsRegister(false);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage(API_MESSAGES.LOGIN.CONNECTION_ERROR);
            }
        }
    };

    const formik = useFormik({
        initialValues: {
            fullName: '',
            numberOfPhone: '',
            email: '',
            password: '',
            cfmpassword: ''
        },
        validationSchema: isRegister ? registerSchema : loginSchema,
        onSubmit: async (values) => {
            if (isLoading) return;
            
            setIsLoading(true);
            setErrorMessage('');
            setSuccessMessage('');

            try {
                if (isRegister) {
                    await handleRegister(values);
                } else {
                    await handleLogin({
                        email: values.email,
                        password: values.password
                    });
                }
            } finally {
                setIsLoading(false);
                clearMessages();
            }
        }
    });

    const switchToRegister = () => {
        formik.resetForm();
        setIsRegister(true);
    };

    const switchToLogin = () => {
        formik.resetForm({
            values: {
                email: formik.values.email,
                password: formik.values.password,
                fullName: '',
                numberOfPhone: '',
                cfmpassword: ''
            }
        });
        setIsRegister(false);
    };

    return {
        isRegister,
        isLoading,
        errorMessage,
        successMessage,
        formik,
        switchToRegister,
        switchToLogin
    };
};
