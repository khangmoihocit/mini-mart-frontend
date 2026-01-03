import React, { useState } from 'react';
import HeaderMainContent from '@/pages/Admin/components/HeaderMainContent/HeaderMainContent';
import Toolbar from '@/pages/Admin/components/Toolbar/Toolbar';
import Pagination from '@/components/Pagination/Pagination';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import styles from './styles.module.scss';
import { AdminContext } from '@/contexts/AdminProvider';
import { useContext } from 'react';
import { CategoryContext } from '@/contexts/CategoryProvider';


const CategoryList = () => {
    const { setType } = useContext(AdminContext);
    const {categories, setCategories} = useContext(CategoryContext);
    const [modalState, setModalState] = useState({ isOpen: false, categoryIdToDelete: null });

    const openDeleteModal = (categoryId) => {
        setModalState({ isOpen: true, categoryIdToDelete: categoryId });
    };

    const closeDeleteModal = () => {
        setModalState({ isOpen: false, categoryIdToDelete: null });
    };

    const handleConfirmDelete = () => {
        if (modalState.categoryIdToDelete) {
            // Logic xóa API sẽ ở đây
            setCategories(prev => prev.filter(cat => cat.id !== modalState.categoryIdToDelete));
        }
        closeDeleteModal();
    };

    return (
        <div>
            <HeaderMainContent
                title={'Danh sách danh mục'}
                navigate={'Dashboard > Sản phẩm > Danh sách danh mục'}
            />

            <Toolbar
                onSearch={(keyword) => console.log('Searching for:', keyword)}
                placeholder='Tìm kiếm danh mục...'
                onClick={() => setType('category-add')}
            />

            <div className={styles.tableContainer}>
                <table className={styles.categoryTable}>
                    <thead>
                        <tr>
                            <th>Tên danh mục</th>
                            <th>Số lượng sản phẩm</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id}>
                                <td>{cat.name}</td>
                                <td>{cat.productCount}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <button className={styles.editBtn}>Sửa</button>
                                        <button className={styles.deleteBtn} onClick={() => openDeleteModal(cat.id)}>Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination sẽ được thêm vào khi có API thật */}
             <Pagination
                currentPage={1}
                totalPages={1}
                onPageChange={() => {}}
                itemsPerPage={10}
                totalItems={categories.length}
                onItemsPerPageChange={() => {}}
            />

            <ConfirmationModal
                isOpen={modalState.isOpen}
                onClose={closeDeleteModal}
                onConfirm={handleConfirmDelete}
                title="Xác nhận xóa danh mục"
                message="Bạn có chắc chắn muốn xóa danh mục này? Tất cả sản phẩm thuộc danh mục này cũng có thể bị ảnh hưởng."
            />
        </div>
    );
};

export default CategoryList;