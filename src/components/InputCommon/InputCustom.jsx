import React from 'react';
import styles from './styles.module.scss';

const InputCustom = ({ 
    label, 
    type = 'text',
    isRequired = false,
    register,
    isError = false,
    dataOptions = [],
    isShowlabel = true
}) => {
    const { formGroup, error } = styles;
    
    const isSelect = dataOptions && dataOptions.length > 0;

    return (
        <div className={formGroup}>
            {isShowlabel && (
                <label>
                    {label} {isRequired && <span className="required">*</span>}
                </label>
            )}
            
            {isSelect ? (
                <select 
                    {...register}
                    className={isError ? error : ''}
                >
                    <option value="">Select {label}</option>
                    {dataOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            ) : (
                <input 
                    type={type}
                    placeholder={isShowlabel ? '' : label}
                    {...register}
                    className={isError ? error : ''}
                />
            )}
            
            {isError && (
                <span className={error}>This field is required</span>
            )}
        </div>
    );
};

export default InputCustom;
