/**
 * Utility functions for form validation and formatting
 */

// Format phone number
export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
};

// Validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate phone number format (Vietnamese)
export const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b/;
    return phoneRegex.test(phoneNumber);
};

// Debounce function for API calls
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Format error messages
export const formatErrorMessage = (error) => {
    if (error.response) {
        return error.response.data.message || 'Đã xảy ra lỗi từ server';
    }
    if (error.request) {
        return 'Không thể kết nối đến server';
    }
    return error.message || 'Đã xảy ra lỗi không xác định';
};
