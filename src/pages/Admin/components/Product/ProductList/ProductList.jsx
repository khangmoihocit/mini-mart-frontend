import Pagination from '@/components/Pagination/Pagination';
import HeaderMainContent from '@/pages/Admin/components/HeaderMainContent/HeaderMainContent';
import Toolbar from '@/pages/Admin/components/Toolbar/Toolbar';
import React, { useState, useEffect, useContext } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import styles from './styles.module.scss';
import productService from '@/apis/productService';
import { formatErrorMessage } from '@/utils/helpers';
import { AdminContext } from '@/contexts/AdminProvider';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { toast } from 'react-toastify';

const ProductList = () => {
    const {
        productListContainer,
        tableContainer,
        productTable,
        productInfo,
        thumbnail,
        status,
        inStock,
        outOfStock,
        actions,
        editBtn,
        deleteBtn
    } = styles;

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Image modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    // Delete confirmation
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    
    const { setType, setSelectedProductId } = useContext(AdminContext);

    useEffect(() => {
        fetchProducts();
    }, [currentPage, itemsPerPage, keyword]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productService.search(currentPage, itemsPerPage, keyword);
            if (response.data.code === 0) {
                const { content, totalPages: total, totalElements } = response.data.result;
                setProducts(content);
                setTotalPages(total);
                setTotalItems(totalElements);
            }
        } catch (error) {
            toast.error(formatErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    const handleSearch = (searchKeyword) => {
        setKeyword(searchKeyword);
        setCurrentPage(1);
    };

    const handleEdit = (productId) => {
        setSelectedProductId(productId);
        setType('product-update');
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;
        
        try {
            await productService.delete(productToDelete.id);
            toast.success('Xóa sản phẩm thành công');
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
            fetchProducts();
        } catch (error) {
            toast.error(formatErrorMessage(error));
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setProductToDelete(null);
    };

    const formatCurrency = value => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    };

    const getFirstImage = (images) => {
        if (images && images.length > 0) {
            return images[0].imageUrl;
        }
        return null;
    };
    const baseUrlImg = "http://localhost:8081/images/"

    const openImageModal = (images, index = 0) => {
        setCurrentImages(images);
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeImageModal = () => {
        setIsModalOpen(false);
        setCurrentImages([]);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => 
            prev < currentImages.length - 1 ? prev + 1 : 0
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => 
            prev > 0 ? prev - 1 : currentImages.length - 1
        );
    };

    const handleKeyDown = (e) => {
        if (!isModalOpen) return;
        if (e.key === 'Escape') closeImageModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, currentImageIndex, currentImages]);

    return (
        <div className={productListContainer}>
            {/* Header */}
            <HeaderMainContent
                title={'Danh sách sản phẩm'}
                navigate={'Dashboard > Sản phẩm > Danh sách sản phẩm'}
            />

            {/* Toolbar */}
            <Toolbar 
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
                onSearch={handleSearch}
                placeholder='Tìm kiếm sản phẩm theo tên, danh mục, mô tả ...'
                onClick={() => setType('product-add')}
            />

            {/* Bảng sản phẩm */}
            <div className={tableContainer}>
                <table className={productTable}>
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>TÊN SẢN PHẨM</th>
                            <th>DANH MỤC</th>
                            <th>GIÁ</th>
                            <th>GIÁ KHUYẾN MÃI</th>
                            <th>SỐ LƯỢNG KHO</th>
                            <th>HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                    Đang tải...
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                    Không có sản phẩm nào
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className={productInfo}>
                                            <div 
                                                className={thumbnail}
                                                onClick={() => product.images && product.images.length > 0 && openImageModal(product.images, 0)}
                                                style={{ cursor: product.images && product.images.length > 0 ? 'pointer' : 'default' }}
                                            >
                                                {getFirstImage(product.images) ? (
                                                    <img 
                                                        src={`${baseUrlImg}${product.images[0].imageUrl}`}
                                                        alt={product.name}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <div style={{ 
                                                        width: '100%', 
                                                        height: '100%', 
                                                        background: '#f0f0f0',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: '#999'
                                                    }}>
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td><div style={{ fontWeight: '500', marginBottom: '4px' }}>
                                                    {product.name}
                                                </div></td>
                                    <td><div style={{ fontSize: '14px', color: '#666' }}>
                                                    {product.category.name}
                                                </div></td>
                                    <td>{formatCurrency(product.price)}</td>
                                    <td>
                                        {product.salePrice 
                                            ? formatCurrency(product.salePrice) 
                                            : '-'}
                                    </td>
                                    <td>
                                        <span className={product.stockQuantity > 0 ? inStock : outOfStock}>
                                            {product.stockQuantity}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={actions}>
                                            <button 
                                                className={editBtn} 
                                                onClick={() => handleEdit(product.id)}
                                            >
                                                Sửa
                                            </button>
                                            <button 
                                                className={deleteBtn}
                                                onClick={() => handleDeleteClick(product)}
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Phân trang */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onItemsPerPageChange={handleItemsPerPageChange}
            />

            {/* Image Modal */}
            {isModalOpen && (
                <div className={styles.imageModal} onClick={closeImageModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={closeImageModal}>
                            ×
                        </button>
                        
                        {currentImages.length > 1 && (
                            <>
                                <button className={styles.prevBtn} onClick={prevImage}>
                                    <LuChevronLeft size={30} />
                                </button>
                                <button className={styles.nextBtn} onClick={nextImage}>
                                    <LuChevronRight size={30} />
                                </button>
                            </>
                        )}
                        
                        <img 
                            src={`${baseUrlImg}${currentImages[currentImageIndex]?.imageUrl}`}
                            alt={`Image ${currentImageIndex + 1}`}
                            className={styles.modalImage}
                        />
                        
                        <div className={styles.imageCounter}>
                            {currentImageIndex + 1} / {currentImages.length}
                        </div>
                        
                        <div className={styles.imageThumbnails}>
                            {currentImages.map((img, index) => (
                                <div 
                                    key={index}
                                    className={`${styles.thumbnailItem} ${index === currentImageIndex ? styles.active : ''}`}
                                    onClick={() => setCurrentImageIndex(index)}
                                >
                                    <img 
                                        src={`${baseUrlImg}${img.imageUrl}`}
                                        alt={`Thumbnail ${index + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Xác nhận xóa sản phẩm"
                message={`Bạn có chắc chắn muốn xóa sản phẩm "${productToDelete?.name}"? Hành động này không thể hoàn tác.`}
                confirmText="Xóa"
                cancelText="Hủy"
            />
        </div>
    );
};

export default ProductList;
