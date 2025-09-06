import React, { useState } from 'react';
import styles from '../styles.module.scss';
import { HiOutlineEye } from 'react-icons/hi';
import { HiOutlineEyeOff } from 'react-icons/hi';

const InputCommon = ({ label, type, ...props}) => {
    const { group, labelInput, input, boxIcon} = styles;

    const [isShowPassword, setIsShowPassword] = useState(false);
    const {request, setRequest, } = props;

    const isPassword = type === 'password';
    const showTextPassword =
        type === 'password' && isShowPassword ? 'text' : type;

    

    const handleShowPassword = ()=>{
        setIsShowPassword(!isShowPassword);
    }

    const handleInputChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        
        // Chỉ cập nhật khi name tồn tại và không rỗng
        if (name && name.trim() !== '') {
            setRequest({...request, [name]: value});
        }
    }

    return (
        <>
            <div className={group}>
                <input
                    type={showTextPassword}
                    className={input}
                    placeholder=" "
                    name={props.name}
                    value={props.value}
                    onChange={handleInputChange}
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
