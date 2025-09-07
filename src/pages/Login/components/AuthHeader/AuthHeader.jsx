import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles.module.scss';
import { UI_MESSAGES } from '@/constants/messages';

const AuthHeader = ({ isRegister, onSwitchMode, errorMessage, successMessage }) => {
    const { textLink, textMessageError, textMessageSuccess } = styles;

    return (
        <div>
            <h2>{UI_MESSAGES.LOGIN_TITLE}</h2>
            <p style={{ textAlign: 'center', fontSize: '14px' }}>
                {!isRegister ? (
                    <div>
                        {UI_MESSAGES.SWITCH_TO_REGISTER.split('Đăng ký tại đây')[0]}
                        <span className={textLink} onClick={onSwitchMode}>
                            Đăng ký tại đây
                        </span>
                    </div>
                ) : (
                    <div>
                        {UI_MESSAGES.SWITCH_TO_LOGIN.split('Đăng nhập tại đây')[0]}
                        <span className={textLink} onClick={onSwitchMode}>
                            Đăng nhập tại đây
                        </span>
                    </div>
                )}
            </p>
            {errorMessage && (
                <p className={textMessageError}>{errorMessage}</p>
            )}
            {successMessage && (
                <p className={textMessageSuccess}>{successMessage}</p>
            )}
        </div>
    );
};

AuthHeader.propTypes = {
    isRegister: PropTypes.bool.isRequired,
    onSwitchMode: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    successMessage: PropTypes.string
};

AuthHeader.defaultProps = {
    errorMessage: '',
    successMessage: ''
};

export default React.memo(AuthHeader);
