import React from 'react';
import styles from './styles.module.scss';

const LoadingOverlay = ({ 
    isLoading = false, 
    message = 'Đang tải...', 
    size = 'medium',
    overlay = true,
    children 
}) => {
    if (!isLoading && !children) return null;

    const sizeClass = {
        small: styles.small,
        medium: styles.medium,
        large: styles.large
    }[size] || styles.medium;

    if (children) {
        return (
            <div className={styles.wrapper}>
                {children}
                {isLoading && (
                    <div className={`${styles.overlay} ${overlay ? styles.withBackground : ''}`}>
                        <div className={styles.loadingContent}>
                            <div className={`${styles.spinner} ${sizeClass}`}>
                                <div className={styles.bounce1}></div>
                                <div className={styles.bounce2}></div>
                                <div className={styles.bounce3}></div>
                            </div>
                            <p className={styles.message}>{message}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Standalone mode: chỉ hiển thị loading
    return (
        <div className={styles.standalone}>
            <div className={styles.loadingContent}>
                <div className={`${styles.spinner} ${sizeClass}`}>
                    <div className={styles.bounce1}></div>
                    <div className={styles.bounce2}></div>
                    <div className={styles.bounce3}></div>
                </div>
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
};

// Compact loading cho inline sử dụng
export const InlineLoading = ({ message = 'Đang tải...', size = 'small' }) => {
    const sizeClass = {
        small: styles.small,
        medium: styles.medium
    }[size] || styles.small;

    return (
        <div className={styles.inline}>
            <div className={`${styles.spinner} ${sizeClass}`}>
                <div className={styles.bounce1}></div>
                <div className={styles.bounce2}></div>
                <div className={styles.bounce3}></div>
            </div>
            <span className={styles.inlineMessage}>{message}</span>
        </div>
    );
};

// Button loading state
export const LoadingButton = ({ 
    children, 
    loading = false, 
    disabled = false,
    loadingText = 'Đang xử lý...',
    className = '',
    ...props 
}) => {
    return (
        <button 
            {...props}
            className={`${styles.loadingButton} ${className}`}
            disabled={loading || disabled}
        >
            {loading ? (
                <>
                    <div className={`${styles.spinner} ${styles.small}`}>
                        <div className={styles.bounce1}></div>
                        <div className={styles.bounce2}></div>
                        <div className={styles.bounce3}></div>
                    </div>
                    <span>{loadingText}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

// Skeleton loader cho tables/lists
export const SkeletonLoader = ({ rows = 3, columns = 4 }) => {
    return (
        <div className={styles.skeleton}>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className={styles.skeletonRow}>
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <div 
                            key={colIndex} 
                            className={styles.skeletonItem}
                            style={{
                                width: colIndex === 0 ? '20%' : 
                                       colIndex === 1 ? '30%' : 
                                       colIndex === 2 ? '25%' : '25%',
                                animationDelay: `${(rowIndex * columns + colIndex) * 0.1}s`
                            }}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default LoadingOverlay;