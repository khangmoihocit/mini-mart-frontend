import React from 'react';
import styles from './styles.module.scss';

const InputCommon = ({ isRequired = false}) => {
    const {container, inputLabel} = styles;

    return (
        <div className={container}>
            <div className={inputLabel}>Name {isRequired && <span>*</span>}</div>
            <input type="text" placeholder='enter name'/>
        </div>
    );
};

export default InputCommon;