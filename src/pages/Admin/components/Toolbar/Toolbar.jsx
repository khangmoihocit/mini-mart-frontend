import React from 'react';
import styles from './styles.module.scss';
import {
    LuPlus,
    LuSearch,
} from 'react-icons/lu';
import Button from '@/pages/Admin/components/Button/Button';
import SelectCommon from '@/components/Pagination/SelectCommon';

const Toolbar = ({ itemsPerPage, onItemsPerPageChange }) => {
    const { toolbar, searchBox, searchIcon, addButton, showing, wrapToolbar } =
        styles;

    return (
        <>
            <div className={toolbar}>
                <div className={wrapToolbar}>
                    <div className={showing}>
                        <p>Hiển thị</p>
                        <SelectCommon itemsPerPage={itemsPerPage} onItemsPerPageChange={onItemsPerPageChange} />
                    </div>
                    <div className={searchBox}>
                        <input type='text' placeholder='Tìm kiếm sản phẩm...' />
                        <LuSearch className={searchIcon} />
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
                    />
                </div>
            </div>
        </>
    );
};

export default Toolbar;
