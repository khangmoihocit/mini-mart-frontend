import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

import authService from '@/apis/authService';
import userService from '@/apis/userService';
import { loginSchema, registerSchema } from '@/validations/authSchemas';
import { API_MESSAGES } from '@/constants/messages';
import { ROUTES } from '@/constants/routes';
import { formatErrorMessage } from '@/utils/helpers';

export const useAuthOptimized = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    // Memoize clearMessages để tránh re-render
    const clearMessages = useCallback(() => {
        const timer = setTimeout(() => {
            setErrorMessage('');
            setSuccessMessage('');
        }, 5000);
        
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = useCallback(async (credentials) => {
        try {
            const response = await authService.login(credentials);
            const token = response.data.result.token;
            Cookies.set('token', token, { expires: 7 }); // Set expire 7 ngày
            navigate(ROUTES.ADMIN);
        } catch (error) {
            const errorMsg = formatErrorMessage(error);
            setErrorMessage(errorMsg);
            throw error;
        }
    }, [navigate]);

    const handleRegister = useCallback(async (userData) => {
        try {
            const {
                fullName,
                numberOfPhone: phoneNumber,
                email,
                password
            } = userData;
            
            await userService.add({
                fullName,
                phoneNumber,
                email,
                password
            });
            
            setSuccessMessage(API_MESSAGES.REGISTER.SUCCESS);
            setIsRegister(false);
        } catch (error) {
            const errorMsg = formatErrorMessage(error);
            setErrorMessage(errorMsg);
            throw error;
        }
    }, []);

    const handleLogout = useCallback(() => {
        Cookies.remove('token');
        navigate('/login');
    }, [navigate]);

    // Check if user is authenticated
    const isAuthenticated = useMemo(() => {
        return !!Cookies.get('token');
    }, []);

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
            } catch (error) {
                // Error đã được handle trong handleLogin/handleRegister
                console.error('Auth error:', error);
            } finally {
                setIsLoading(false);
                clearMessages();
            }
        }
    });

    const switchToRegister = useCallback(() => {
        formik.resetForm();
        setIsRegister(true);
        setErrorMessage('');
        setSuccessMessage('');
    }, [formik]);

    const switchToLogin = useCallback(() => {
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
        setErrorMessage('');
        setSuccessMessage('');
    }, [formik]);

    return {
        // State
        isRegister,
        isLoading,
        errorMessage,
        successMessage,
        isAuthenticated,
        
        // Form
        formik,
        
        // Actions
        handleLogin,
        handleRegister,
        handleLogout,
        switchToRegister,
        switchToLogin,
        clearMessages
    };
};