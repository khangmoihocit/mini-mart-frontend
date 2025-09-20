import React from 'react';
import styles from './styles.module.scss';
import {
    LuPlus,
    LuSearch,
} from 'react-icons/lu';
import Button from '@/pages/Admin/components/Button/Button';

const Toolbar = () => {
    const { toolbar, searchBox, searchIcon, addButton, showing, wrapToolbar } =
        styles;

    return (
        <>
            <div className={toolbar}>
                <div className={wrapToolbar}>
                    <div className={showing}>
                        <p>Hiển thị</p>
                        <select name='showing' id=''>
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='30'>30</option>
                        </select>
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
