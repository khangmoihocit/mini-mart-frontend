import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import cartService from '@/apis/cartService';
import { toast } from 'react-toastify';

export const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [listProductCart, setListProductCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [detailProduct, setDetailProduct] = useState(null);

    const handleGetListProducCart = async (userId, type) => {
        if (userId && type === 'cart') {       
            setIsLoading(true);
            try {
                const response = await cartService.getCart();
                setListProductCart(response.data.result.items || []);
                setCartCount(response.data.result.totalItems || 0);
            } catch (error) {
                console.error('Error loading cart:', error);
                setListProductCart([]);
                setCartCount(0);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const updateCartCount = async () => {
        try {
            const response = await cartService.getCartCount();
            if (response.data.code === 1000 || response.data.code === 0) {
                setCartCount(response.data.result || 0);
            }
        } catch (error) {
            console.error('Error getting cart count:', error);
        }
    };

    const values = {
        isOpen,
        setIsOpen,
        type,
        setType,
        handleGetListProducCart,
        listProductCart,
        isLoading,
        cartCount,
        updateCartCount,
        detailProduct,
        setDetailProduct
    };

    useEffect(() => {
        const userId = Cookies.get('userId');
        if (userId) {
            handleGetListProducCart(userId, 'cart');
        }
    }, []);

    return (
        <SideBarContext.Provider value={values}>
            {children}
        </SideBarContext.Provider>
    );
};
