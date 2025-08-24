import React, { useState } from 'react';
import styles from '../styles.module.scss';
import { HiOutlineEye } from 'react-icons/hi';
import { HiOutlineEyeOff } from 'react-icons/hi';

const InputCommon = ({ label, type }) => {
    const { group, labelInput, input, boxIcon} = styles;

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [value, setValue] = useState('');

    const isPassword = type === 'password';
    const showTextPassword =
        type === 'password' && isShowPassword ? 'text' : type;

    const handleShowPassword = ()=>{
        setIsShowPassword(!isShowPassword);
    }

    return (
        <>
            <div className={group}>
                <input
                    type={showTextPassword}
                    className={input}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder=" "
                />
                {isPassword && (
                    <div className={boxIcon} onClick={handleShowPassword}>
                        {isShowPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                    </div>
                )}
                <div className={labelInput}>
                    {label}
                </div>
            </div>
        </>
    );
};

export default InputCommon;
