// Form validation messages
export const VALIDATION_MESSAGES = {
    EMAIL: {
        REQUIRED: 'Email không được để trống.',
        INVALID: 'Email không đúng định dạng.'
    },
    PASSWORD: {
        REQUIRED: 'Mật khẩu không được để trống.',
        MIN_LENGTH: 'Mật khẩu phải có ít nhất 8 ký tự.',
        MISMATCH: 'Mật khẩu xác nhận không khớp.'
    },
    FULL_NAME: {
        REQUIRED: 'Họ và tên không được để trống.',
        MIN_LENGTH: 'Họ và tên phải có ít nhất 2 ký tự.'
    },
    PHONE: {
        REQUIRED: 'Số điện thoại không được để trống.',
        INVALID: 'Số điện thoại không hợp lệ.'
    },
    CONFIRM_PASSWORD: {
        REQUIRED: 'Vui lòng xác nhận lại mật khẩu.'
    }
};

// API response messages
export const API_MESSAGES = {
    LOGIN: {
        INVALID_CREDENTIALS: 'Thông tin đăng nhập không hợp lệ.',
        CONNECTION_ERROR: 'Không thể kết nối đến server.'
    },
    REGISTER: {
        SUCCESS: 'Đăng ký thành công!'
    }
};

// UI Messages
export const UI_MESSAGES = {
    LOADING: 'Loading...',
    LOGIN_TITLE: 'Đăng nhập tài khoản',
    REGISTER_TITLE: 'Đăng ký tài khoản',
    SWITCH_TO_REGISTER: 'Bạn chưa có tài khoản ? Đăng ký tại đây',
    SWITCH_TO_LOGIN: 'Bạn đã có tài khoản ? Đăng nhập tại đây',
    FORGOT_PASSWORD: 'Quên mật khẩu? Nhấn vào đây',
    OR_LOGIN_WITH: 'Hoặc đăng nhập bằng'
};
