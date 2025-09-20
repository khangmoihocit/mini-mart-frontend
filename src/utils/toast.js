import { toast } from 'react-toastify';
import { createElement } from 'react';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi';

// Toast configuration
const toastConfig = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'custom-toast-container',
};

// Helper function to create toast content with icon
const createToastContent = (Icon, message, iconSize = 20) => {
    return createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: '8px' }
    }, [
        createElement(Icon, { key: 'icon', size: iconSize }),
        createElement('span', { key: 'message' }, message)
    ]);
};

// Success toast with icon
export const showSuccess = (message, options = {}) => {
    return toast.success(
        createToastContent(FiCheckCircle, message),
        {
            ...toastConfig,
            ...options,
        }
    );
};

// Error toast with icon
export const showError = (message, options = {}) => {
    return toast.error(
        createToastContent(FiXCircle, message),
        {
            ...toastConfig,
            autoClose: 6000, // Error messages stay longer
            ...options,
        }
    );
};

// Warning toast with icon
export const showWarning = (message, options = {}) => {
    return toast.warning(
        createToastContent(FiAlertTriangle, message),
        {
            ...toastConfig,
            ...options,
        }
    );
};

// Info toast with icon
export const showInfo = (message, options = {}) => {
    return toast.info(
        createToastContent(FiInfo, message),
        {
            ...toastConfig,
            ...options,
        }
    );
};

// Loading spinner component
const createLoadingSpinner = () => {
    return createElement('div', {
        className: 'loading-spinner',
        style: {
            width: '16px',
            height: '16px',
            border: '2px solid #ffffff40',
            borderTop: '2px solid #ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }
    });
};

// Loading toast content
const createLoadingContent = (message) => {
    return createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: '8px' }
    }, [
        createLoadingSpinner(),
        createElement('span', { key: 'message' }, message)
    ]);
};

// Loading toast (returns toast id for updating)
export const showLoading = (message = 'Đang xử lý...', options = {}) => {
    return toast.loading(
        createLoadingContent(message),
        {
            ...toastConfig,
            autoClose: false,
            closeOnClick: false,
            draggable: false,
            ...options,
        }
    );
};

// Update loading toast to success
export const updateToSuccess = (toastId, message, options = {}) => {
    return toast.update(toastId, {
        render: createToastContent(FiCheckCircle, message),
        type: 'success',
        isLoading: false,
        autoClose: 4000,
        closeOnClick: true,
        draggable: true,
        ...options,
    });
};

// Update loading toast to error
export const updateToError = (toastId, message, options = {}) => {
    return toast.update(toastId, {
        render: createToastContent(FiXCircle, message),
        type: 'error',
        isLoading: false,
        autoClose: 6000,
        closeOnClick: true,
        draggable: true,
        ...options,
    });
};

// Dismiss specific toast
export const dismissToast = (toastId) => {
    toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAllToasts = () => {
    toast.dismiss();
};

// Promise toast - automatically handles loading/success/error states
export const showPromiseToast = (
    promise,
    {
        loading = 'Đang xử lý...',
        success = 'Thành công!',
        error = 'Có lỗi xảy ra!'
    } = {}
) => {
    return toast.promise(promise, {
        pending: {
            render: createLoadingContent(loading),
            ...toastConfig,
            autoClose: false,
            closeOnClick: false,
        },
        success: {
            render: ({ data }) => createToastContent(FiCheckCircle, typeof success === 'function' ? success(data) : success),
            ...toastConfig,
        },
        error: {
            render: ({ data }) => createToastContent(FiXCircle, typeof error === 'function' ? error(data) : error),
            ...toastConfig,
            autoClose: 6000,
        },
    });
};

// Create action button
const createActionButton = (actionText, onAction) => {
    return createElement('button', {
        onClick: () => {
            onAction();
            toast.dismiss();
        },
        style: {
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '6px',
            color: 'white',
            padding: '6px 12px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginLeft: '12px'
        },
        onMouseOver: (e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.3)';
        },
        onMouseOut: (e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.2)';
        }
    }, actionText);
};

// Custom toast for specific actions
export const showActionToast = (message, actionText, onAction, options = {}) => {
    const content = createElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }
    }, [
        createElement('span', { key: 'message' }, message),
        createActionButton(actionText, onAction)
    ]);

    return toast(content, {
        ...toastConfig,
        autoClose: 8000,
        ...options,
    });
};

export default {
    success: showSuccess,
    error: showError,
    warning: showWarning,
    info: showInfo,
    loading: showLoading,
    updateToSuccess,
    updateToError,
    dismiss: dismissToast,
    dismissAll: dismissAllToasts,
    promise: showPromiseToast,
    action: showActionToast,
};