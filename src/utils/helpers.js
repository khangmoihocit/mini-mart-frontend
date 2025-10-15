export const formatErrorMessage = (error) => {
    if (error.response) {
        return error.response.data.message || 'Đã xảy ra lỗi từ server';
    }
    if (error.request) {
        return 'Không thể kết nối đến server';
    }
    return error.message || 'Đã xảy ra lỗi không xác định';
};

export const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
};
