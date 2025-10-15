import Pagination from '@/components/Pagination/Pagination';
import HeaderMainContent from '@/pages/Admin/components/HeaderMainContent/HeaderMainContent';
import Toolbar from '@/pages/Admin/components/Toolbar/Toolbar';
import React, { useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import styles from './styles.module.scss';

const mockProducts = [
    {
        id: 7712309,
        name: "Milk-Bone Mini's Flavor Snacks Dog Treats, 15 Ounce",
        price: 1452500,
        thumbnail:
            'https://via.placeholder.com/150/FFC0CB/000000?Text=Product1',
        stock_quantity: 20,
        category_id: 1
    },
    {
        id: 7712310,
        name: 'Weruva Pumpkin Patch Up! Dog & Cat Food...',
        price: 1452500,
        thumbnail:
            'https://via.placeholder.com/150/ADD8E6/000000?Text=Product2',
        stock_quantity: 15,
        category_id: 1
    },
    {
        id: 7712311,
        name: 'Grain Free Dry Dog Food | Rachael Ray® Nutrish®',
        price: 2100000,
        thumbnail:
            'https://via.placeholder.com/150/90EE90/000000?Text=Product3',
        stock_quantity: 0,
        category_id: 2
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail:
            'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail:
            'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail:
            'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail:
            'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail:
            'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail:
            'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail:
            'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail:
            'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail:
            'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    },
    {
        id: 7712312,
        name: 'Pedigree Adult Dry Dog Food, Chicken & Steak',
        price: 980000,
        thumbnail:
            'https://via.placeholder.com/150/FFFF00/000000?Text=Product4',
        stock_quantity: 50,
        category_id: 1
    }
];

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

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleItemsPerPageChange = (number) => {
        setItemsPerPage(number);
        setCurrentPage(1); // Reset to first page when items per page changes
    };

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
            <HeaderMainContent
                title={'Danh sách sản phẩm'}
                navigate={'Dashboard > Sản phẩm > Danh sách sản phẩm'}
            />

            {/* Toolbar */}
            <Toolbar />

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
                                        className={`${status} ${product.stock_quantity > 0
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
                                        <button className={deleteBtn}>
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Phân trang */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={mockProducts.length}
                onItemsPerPageChange={handleItemsPerPageChange}
            />
        </div>
    );
};

export default ProductList;
