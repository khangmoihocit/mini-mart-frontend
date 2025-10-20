import React, { useState, useContext } from 'react';
import HeaderMainContent from '@/pages/Admin/components/HeaderMainContent/HeaderMainContent';
import InputCommon from '@/components/InputCommon/InputCommon';
import Button from '@/pages/Admin/components/Button/Button';
import styles from './styles.module.scss';
import { AdminContext } from '@/contexts/AdminProvider';
import toast from '@/utils/toast';
import { CategoryContext } from '@/contexts/CategoryProvider';

const CategoryAdd = () => {
    const { setType } = useContext(AdminContext);
    const [categoryName, setCategoryName] = useState('');
    const { createCategory } = useContext(CategoryContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            toast.error('Tên danh mục không được để trống!');
            return;
        }
        createCategory({ name: categoryName });
        toast.success(`Đã tạo danh mục "${categoryName}" thành công!`);
        setType('category-list');
    };

    const handleCancel = () => {
        setType('category-list');
    }

    return (
        <>
            <HeaderMainContent
                title={'Thêm danh mục mới'}
                navigate={'Dashboard > Sản phẩm > Thêm danh mục'}
            />
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <InputCommon
                        label="Tên danh mục"
                        name="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <div className={styles.buttonGroup}>
                        <div style={{ width: '120px' }}>
                            <Button content="Hủy" isPrimary={false} type="button" onClick={handleCancel} />
                        </div>
                        <div style={{ width: '120px' }}>
                            <Button content="Lưu" type="submit" />
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CategoryAdd;