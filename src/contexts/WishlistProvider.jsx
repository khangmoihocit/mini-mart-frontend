import React, { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const WISHLIST_KEY = 'minimart_wishlist';
    const EXPIRY_DAYS = 2; // Thời gian lưu trữ wishlist (2 ngày)

    // Load wishlist từ localStorage khi component mount
    useEffect(() => {
        loadWishlist();
    }, []);

    // Lưu wishlist vào localStorage mỗi khi có thay đổi
    useEffect(() => {
        if (wishlist.length >= 0) {
            saveWishlist(wishlist);
        }
    }, [wishlist]);

    const loadWishlist = () => {
        try {
            const stored = localStorage.getItem(WISHLIST_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                const now = new Date().getTime();
                
                // Lọc ra những sản phẩm chưa hết hạn
                const validItems = parsed.filter(item => {
                    const expiryTime = new Date(item.addedAt).getTime() + (EXPIRY_DAYS * 24 * 60 * 60 * 1000);
                    return now < expiryTime;
                });

                setWishlist(validItems);
                
                // Nếu có items đã hết hạn, cập nhật lại localStorage
                if (validItems.length !== parsed.length) {
                    localStorage.setItem(WISHLIST_KEY, JSON.stringify(validItems));
                }
            }
        } catch (error) {
            console.error('Error loading wishlist:', error);
            setWishlist([]);
        }
    };

    const saveWishlist = (items) => {
        try {
            localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
        } catch (error) {
            console.error('Error saving wishlist:', error);
        }
    };

    const addToWishlist = (product) => {
        const existingIndex = wishlist.findIndex(item => item.id === product.id);
        
        if (existingIndex === -1) {
            const newItem = {
                ...product,
                addedAt: new Date().toISOString()
            };
            setWishlist(prev => [...prev, newItem]);
            return { success: true, message: 'Đã thêm vào danh sách yêu thích' };
        } else {
            return { success: false, message: 'Sản phẩm đã có trong danh sách yêu thích' };
        }
    };

    const removeFromWishlist = (productId) => {
        setWishlist(prev => prev.filter(item => item.id !== productId));
        return { success: true, message: 'Đã xóa khỏi danh sách yêu thích' };
    };

    const isInWishlist = (productId) => {
        return wishlist.some(item => item.id === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem(WISHLIST_KEY);
        return { success: true, message: 'Đã xóa toàn bộ danh sách yêu thích' };
    };

    const toggleWishlist = (product) => {
        if (isInWishlist(product.id)) {
            return removeFromWishlist(product.id);
        } else {
            return addToWishlist(product);
        }
    };

    const getWishlistCount = () => {
        return wishlist.length;
    };

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        toggleWishlist,
        getWishlistCount
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistProvider;
