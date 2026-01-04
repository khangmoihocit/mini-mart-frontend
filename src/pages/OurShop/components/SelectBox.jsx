import React from 'react';
import styles from '../styles.module.scss';

const SelectBox = ({options, getValue, type}) => {
    const {selectBox} = styles;
    return (
        <select
            onChange={e => {
                getValue(e.target.value, type);
            }}
            className={selectBox}
        >
            {options.map(option => {
                return (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                );
            })}
        </select>
    );
};

export default SelectBox;
