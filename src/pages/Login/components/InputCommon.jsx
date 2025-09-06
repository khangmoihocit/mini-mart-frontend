import React, { useState } from 'react';
import styles from '../styles.module.scss';
import { HiOutlineEye } from 'react-icons/hi';
import { HiOutlineEyeOff } from 'react-icons/hi';

const InputCommon = ({ label, type, ...props }) => {
    const { group, labelInput, input, boxIcon , errorMessage} = styles;

    const [isShowPassword, setIsShowPassword] = useState(false);
    const { formik, id } = props;

    const isPassword = type === 'password';
    const showTextPassword =
        type === 'password' && isShowPassword ? 'text' : type;

    const isError = formik.touched[id] && formik.errors[id];
    const messageError = formik.errors[id];

    const handleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;

        // Chỉ cập nhật khi name tồn tại và không rỗng
        if (name && name.trim() !== '') {
            setRequest({ ...request, [name]: value });
        }
    };

    return (
        <>
            <div className={group}>
                <input
                    type={showTextPassword}
                    className={input}
                    placeholder=' '

                    {...props}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values[id]}
                />
                {isPassword && (
                    <div className={boxIcon} onClick={handleShowPassword}>
                        {isShowPassword ? (
                            <HiOutlineEyeOff />
                        ) : (
                            <HiOutlineEye />
                        )}
                    </div>
                )}
                {isError ? (<div className={errorMessage}>{messageError}</div>) : (<div className={errorMessage}></div>)}
                <div className={labelInput}>{label}</div>
            </div>
        </>
    );
};

export default InputCommon;
