import React, { useContext, useState } from 'react';
import styles from './styles.module.scss';
import {
    LuPlus,
    LuSearch,
} from 'react-icons/lu';
import Button from '@/pages/Admin/components/Button/Button';
import SelectCommon from '@/components/Pagination/SelectCommon';

const Toolbar = ({ itemsPerPage, onItemsPerPageChange, onSearch, placeholder = 'Tìm kiếm ...', onClick }) => {
    const { toolbar, searchBox, searchIcon, addButton, showing, wrapToolbar } = styles;

    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && onSearch) {
            onSearch(searchTerm);
        }
    };

    const handleSearchIconClick = () => {
        if (onSearch) {
            onSearch(searchTerm);
        }
    };

    return (
        <>
            <div className={toolbar}>
                <div className={wrapToolbar}>
                    <div className={showing}>
                        <p>Hiển thị</p>
                        <SelectCommon itemsPerPage={itemsPerPage} onItemsPerPageChange={onItemsPerPageChange} />
                    </div>
                    <div className={searchBox}>
                        <input
                            type='text'
                            placeholder={placeholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <LuSearch
                            className={searchIcon}
                            onClick={handleSearchIconClick}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
                <div style={{ width: '150px' }}>
                    <Button
                        isPrimary={false}
                        content={
                            <div className={addButton}>
                                <LuPlus />
                                Thêm mới
                            </div>
                        }
                        onClick={onClick}
                    />
                </div>
            </div>
        </>
    );
};

export default Toolbar;
