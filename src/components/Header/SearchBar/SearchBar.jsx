import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline, IoCloseOutline } from 'react-icons/io5';
import productService from '@/apis/productService';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { ToastContext } from '@/contexts/ToastProvider';

const SearchBar = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();
    const { toast } = useContext(ToastContext);
    const baseUrlImg = 'http://localhost:8081/images/';

    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (searchTerm.trim()) {
                handleSearch(searchTerm);
            } else {
                setSearchResults([]);
            }
        }, 500); // Debounce 500ms

        return () => clearTimeout(delaySearch);
    }, [searchTerm]);

    const handleSearch = async (keyword) => {
        if (!keyword.trim()) return;

        try {
            setIsLoading(true);
            const response = await productService.search(1, 10, keyword);
            
            if (response.data.code === 1000 || response.data.code === 0) {
                setSearchResults(response.data.result.content || []);
            }
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            navigateToShop();
        }
    };

    const navigateToShop = () => {
        navigate(`/shop?keyword=${encodeURIComponent(searchTerm.trim())}`);
        handleClose();
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        handleClose();
    };

    const handleClose = () => {
        setSearchTerm('');
        setSearchResults([]);
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.searchOverlay}>
            <div className={styles.searchContainer}>
                <div className={styles.searchBox}>
                    <IoSearchOutline className={styles.searchIcon} />
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={styles.searchInput}
                    />
                    <IoCloseOutline 
                        className={styles.closeIcon}
                        onClick={handleClose}
                    />
                </div>

                {isLoading && (
                    <div className={styles.loadingText}>Đang tìm kiếm...</div>
                )}

                {!isLoading && searchResults.length > 0 && (
                    <div className={styles.resultsContainer}>
                        <div className={styles.resultsHeader}>
                            <span>Kết quả tìm kiếm</span>
                            <span 
                                className={styles.viewAll}
                                onClick={navigateToShop}
                            >
                                Xem tất cả →
                            </span>
                        </div>
                        <div className={styles.resultsList}>
                            {searchResults.map((product) => (
                                <div
                                    key={product.id}
                                    className={styles.resultItem}
                                    onClick={() => handleProductClick(product.id)}
                                >
                                    <img
                                        src={`${baseUrlImg}${product.images[0]?.imageUrl}`}
                                        alt={product.name}
                                        className={styles.productImage}
                                    />
                                    <div className={styles.productInfo}>
                                        <div className={styles.productName}>
                                            {product.name}
                                        </div>
                                        <div className={styles.productPrice}>
                                            {product.price.toLocaleString('vi-VN')}đ
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.resultsFooter}>
                            <span>Nhấn Enter để xem tất cả kết quả</span>
                        </div>
                    </div>
                )}

                {!isLoading && searchTerm && searchResults.length === 0 && (
                    <div className={styles.noResults}>
                        Không tìm thấy sản phẩm nào
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
};

export default SearchBar;
