import React from 'react';
import styles from './styles.module.scss';

const InputCommon = ({ label, name, value, onChange, disabled=false }) => {
    const { formGroup } = styles;
    return (
        <div className={formGroup}>
            <label htmlFor={name}>{label}</label>
            <input type="text" name={name} value={value} onChange={onChange} disabled={disabled} />
        </div>
    );
};

export default InputCommon;