import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import styles from '../styles.module.scss';

const InputCommon = ({ label, type, formik, id, ...props }) => {
    const { group, labelInput, input, boxIcon, errorMessage } = styles;
    
    const [isShowPassword, setIsShowPassword] = useState(false);

    const isPassword = type === 'password';
    const showTextPassword = isPassword && isShowPassword ? 'text' : type;
    const isError = formik.touched[id] && formik.errors[id];
    const messageError = formik.errors[id];

    const handleShowPassword = useCallback(() => {
        setIsShowPassword(prev => !prev);
    }, []);

    return (
        <div className={group}>
            <input
                type={showTextPassword}
                className={input}
                placeholder=" "
                name={id}
                id={id}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[id] || ''}
                {...props}
            />
            {isPassword && (
                <div className={boxIcon} onClick={handleShowPassword}>
                    {isShowPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </div>
            )}
            <div className={errorMessage}>
                {isError ? messageError : ''}
            </div>
            <div className={labelInput}>{label}</div>
        </div>
    );
};

InputCommon.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    formik: PropTypes.shape({
        handleBlur: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
        touched: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
    }).isRequired,
    id: PropTypes.string.isRequired
};

export default React.memo(InputCommon);
