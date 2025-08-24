import React, { useState } from 'react';
import styles from '../styles.module.scss';

const InputCommon = ({label, type, isRequire = false}) => {
    const {group, labelInput, input} = styles;

    const [isShowPassword, setIsShowPassword] = useState(false);
    const [value, setValue] = useState('');

    const showTextPassword = type === 'password' && isShowPassword ? 'text' : type;

    return (
        <div className={group}>
            <input
                type={showTextPassword}
                className={input}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
            />
            <div className={labelInput}>
                {label} {isRequire && <span>*</span>}
            </div>
        </div>
    );
};

export default InputCommon;