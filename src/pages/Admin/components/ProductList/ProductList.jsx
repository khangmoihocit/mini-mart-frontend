import React, { useState } from 'react';
import styles from './styles.module.scss';
import { LuPlus, LuSearch, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import Button from '@pages/Admin/components/Button/Button';
import HeaderMainContent from '@/pages/Admin/components/HeaderMainContent/HeaderMainContent';

// Dữ liệu giả lập dựa trên cấu trúc bảng `products` của bạn
const mockProducts = [
    {
        id: 7712309,
        name: 'Milk-Bone Mini\'s Flavor Snacks Dog Treats, 15 Ounce',
        price: 1452500,
        thumbnail: 'https://via.placeholder.com/150/FFC0CB/000000?Text=Product1',
        stock_quantity: 20,
        category_id: 1
    },
    {
        id: 7712310,
        name: 'Weruva Pumpkin Patch Up! Dog & Cat Food...',
        price: 1452500,
        thumbnail: 'https://via.placeholder.com/150/ADD8E6/000000?Text=Product2',
        stock_quantity: 15,
        category_id: 1
    },
    {
        id: 7712311,
        name: 'Grain Free Dry Dog Food | Rachael Ray® Nutrish®',
        price: 2100000,
        thumbnail: 'https://via.placeholder.com/150/90EE90/000000?Text=Product3',
        stock_quantity: 0,
        category_id: 2
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail: 'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
];

const ProductList = () => {
    const {
        productListContainer,
        toolbar,
        searchBox,
        searchIcon,
        addButton,
        tableContainer,
        productTable,
        productInfo,
        thumbnail,
        status,
        inStock,
        outOfStock,
        actions,
        editBtn,
        deleteBtn,
        pagination,
        paginationInfo,
        paginationControls,
        activePage
    } = styles;

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Logic phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = mockProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(mockProducts.length / itemsPerPage);

    const formatCurrency = value => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    };

    return (
        <div className={productListContainer}>
            {/* Header */}
            <HeaderMainContent title={'Danh sách sản phẩm'} navigate={'Dashboard > Sản phẩm > Danh sách sản phẩm'}/>

            {/* Toolbar */}
            <div className={toolbar}>
                <div className={searchBox}>
                    <input type='text' placeholder='Tìm kiếm sản phẩm...' />
                    <LuSearch className={searchIcon} />
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

            {/* Bảng sản phẩm */}
            <div className={tableContainer}>
                <table className={productTable}>
                    <thead>
                        <tr>
                            <th>
                                <input type='checkbox' />
                            </th>
                            <th>SẢN PHẨM</th>
                            <th>MÃ SP</th>
                            <th>GIÁ</th>
                            <th>SỐ LƯỢNG KHO</th>
                            <th>TRẠNG THÁI</th>
                            <th>HÀNH ĐỘNG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <input type='checkbox' />
                                </td>
                                <td>
                                    <div className={productInfo}>
                                        <img
                                            src={product.thumbnail}
                                            alt={product.name}
                                            className={thumbnail}
                                        />
                                        <span>{product.name}</span>
                                    </div>
                                </td>
                                <td>#{product.id}</td>
                                <td>{formatCurrency(product.price)}</td>
                                <td>{product.stock_quantity}</td>
                                <td>
                                    <span
                                        className={`${status} ${
                                            product.stock_quantity > 0
                                                ? inStock
                                                : outOfStock
                                        }`}
                                    >
                                        {product.stock_quantity > 0
                                            ? 'Còn hàng'
                                            : 'Hết hàng'}
                                    </span>
                                </td>
                                <td>
                                    <div className={actions}>
                                        <button className={editBtn}>Sửa</button>
                                        <button className={deleteBtn}>Xóa</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Phân trang */}
            <div className={pagination}>
                <div className={paginationInfo}>
                    Hiển thị {indexOfFirstItem + 1} đến{' '}
                    {Math.min(indexOfLastItem, mockProducts.length)} của{' '}
                    {mockProducts.length} mục
                </div>
                <div className={paginationControls}>
                    <button>
                        <LuChevronLeft />
                    </button>
                    {[...Array(totalPages).keys()].map(number => (
                        <button
                            key={number + 1}
                            className={currentPage === number + 1 ? activePage : ''}
                        >
                            {number + 1}
                        </button>
                    ))}
                    <button>
                        <LuChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductList;