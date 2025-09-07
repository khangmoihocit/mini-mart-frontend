import * as Yup from 'yup';
import { VALIDATION_MESSAGES } from '@/constants/messages';

// Schema cho đăng nhập
export const loginSchema = Yup.object({
    email: Yup.string()
        .email(VALIDATION_MESSAGES.EMAIL.INVALID)
        .required(VALIDATION_MESSAGES.EMAIL.REQUIRED),
    password: Yup.string()
        .required(VALIDATION_MESSAGES.PASSWORD.REQUIRED)
});

// Schema cho đăng ký
export const registerSchema = Yup.object({
    fullName: Yup.string()
        .min(2, VALIDATION_MESSAGES.FULL_NAME.MIN_LENGTH)
        .required(VALIDATION_MESSAGES.FULL_NAME.REQUIRED),
    numberOfPhone: Yup.string()
        .matches(
            /^(0[3|5|7|8|9])+([0-9]{8})\b/,
            VALIDATION_MESSAGES.PHONE.INVALID
        )
        .required(VALIDATION_MESSAGES.PHONE.REQUIRED),
    email: Yup.string()
        .email(VALIDATION_MESSAGES.EMAIL.INVALID)
        .required(VALIDATION_MESSAGES.EMAIL.REQUIRED),
    password: Yup.string()
        .min(8, VALIDATION_MESSAGES.PASSWORD.MIN_LENGTH)
        .required(VALIDATION_MESSAGES.PASSWORD.REQUIRED),
    cfmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], VALIDATION_MESSAGES.PASSWORD.MISMATCH)
        .required(VALIDATION_MESSAGES.CONFIRM_PASSWORD.REQUIRED)
});
