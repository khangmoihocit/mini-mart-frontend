import React from 'react';
import toast from '@/utils/toast';

const ToastDemo = () => {
    const handleSuccessToast = () => {
        toast.success('Thao tác thành công! Dữ liệu đã được lưu.');
    };

    const handleErrorToast = () => {
        toast.error('Có lỗi xảy ra! Vui lòng kiểm tra lại thông tin.');
    };

    const handleWarningToast = () => {
        toast.warning('Cảnh báo: Dữ liệu có thể không được lưu đầy đủ.');
    };

    const handleInfoToast = () => {
        toast.info('Thông tin: Hệ thống sẽ bảo trì vào 2h sáng ngày mai.');
    };

    const handleLoadingToast = () => {
        const loadingToast = toast.loading('Đang xử lý yêu cầu...');
        
        // Simulate API call
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                toast.updateToSuccess(loadingToast, 'Xử lý thành công!');
            } else {
                toast.updateToError(loadingToast, 'Xử lý thất bại!');
            }
        }, 3000);
    };

    const handlePromiseToast = () => {
        const fakeApiCall = new Promise((resolve, reject) => {
            setTimeout(() => {
                Math.random() > 0.5 ? resolve('Success!') : reject('Error!');
            }, 2000);
        });

        toast.promise(fakeApiCall, {
            loading: 'Đang gửi dữ liệu...',
            success: 'Gửi dữ liệu thành công!',
            error: 'Gửi dữ liệu thất bại!'
        });
    };

    const handleActionToast = () => {
        toast.action(
            'Bạn có muốn xóa mục này không?',
            'Xóa ngay',
            () => {
                toast.success('Đã xóa thành công!');
            }
        );
    };

    return (
        <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <h3 style={{ width: '100%', marginBottom: '20px' }}>Toast Notifications Demo</h3>
            
            <button onClick={handleSuccessToast} style={buttonStyle('success')}>
                Success Toast
            </button>
            
            <button onClick={handleErrorToast} style={buttonStyle('error')}>
                Error Toast
            </button>
            
            <button onClick={handleWarningToast} style={buttonStyle('warning')}>
                Warning Toast
            </button>
            
            <button onClick={handleInfoToast} style={buttonStyle('info')}>
                Info Toast
            </button>
            
            <button onClick={handleLoadingToast} style={buttonStyle('loading')}>
                Loading Toast
            </button>
            
            <button onClick={handlePromiseToast} style={buttonStyle('promise')}>
                Promise Toast
            </button>
            
            <button onClick={handleActionToast} style={buttonStyle('action')}>
                Action Toast
            </button>
            
            <button onClick={() => toast.dismissAll()} style={buttonStyle('dismiss')}>
                Dismiss All
            </button>
        </div>
    );
};

const buttonStyle = (type) => {
    const colors = {
        success: '#22c55e',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6',
        loading: '#6b7280',
        promise: '#8b5cf6',
        action: '#f97316',
        dismiss: '#dc2626'
    };

    return {
        padding: '8px 16px',
        border: 'none',
        borderRadius: '6px',
        backgroundColor: colors[type] || '#6b7280',
        color: 'white',
        cursor: 'pointer',
        fontWeight: '500',
        fontSize: '14px',
        transition: 'all 0.2s ease',
        '&:hover': {
            opacity: 0.9
        }
    };
};

export default ToastDemo;