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

export const formatErrorMessage = (error) => {
    if (error.response) {
        return error.response.data.message || 'Đã xảy ra lỗi từ server';
    }
    if (error.request) {
        return 'Không thể kết nối đến server';
    }
    return error.message || 'Đã xảy ra lỗi không xác định';
};
