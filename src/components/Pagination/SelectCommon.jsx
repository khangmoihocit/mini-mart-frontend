import React from 'react';
import styles from './styles.module.scss';

const SelectCommon = ({ itemsPerPage, onItemsPerPageChange }) => {
    const { itemsPerPageSelector } = styles;
    return (
        <div>
            <select
                className={itemsPerPageSelector}
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
            </select>
        </div>
    );
};

export default SelectCommon;