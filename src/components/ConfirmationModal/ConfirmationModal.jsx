import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Xác nhận hành động',
    message = 'Bạn có chắc chắn muốn thực hiện hành động này không?',
    confirmText = 'Xác nhận',
    cancelText = 'Hủy'
}) => {

    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay} onClick={onClose}>   
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.message}>{message}</p>
                <div className={styles.buttonGroup}>
                    
                    <div style={{ width: '120px' }}>
                        <Button
                            content={cancelText}
                            variant='tertiary' 
                            onClick={onClose}
                        />
                    </div>
                    
                    <div style={{ width: '120px' }}>
                        <Button
                            content={confirmText}
                            variant='secondary'
                            onClick={onConfirm}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
};

export default React.memo(ConfirmationModal);