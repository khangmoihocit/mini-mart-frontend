import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
// import { getCart } from '@/apis/cartService';

export const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [listProductCart, setListProductCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetListProducCart = (userId, type) => {
        if (userId && type === 'cart') {       
            setIsLoading(true);
            // getCart(userId)
            //     .then(res => {
            //         setListProductCart(res.data.data);
            //         setIsLoading(false);
            //     })
            //     .catch(error => {
            //         setListProductCart([]);
            //         setIsLoading(false);
            //     });
        }
    };

    const values = {
        isOpen,
        setIsOpen,
        type,
        setType,
        handleGetListProducCart,
        listProductCart,
        isLoading
    };

    useEffect(() => {
        handleGetListProducCart(Cookies.get('userId'), 'cart');
    }, []);

    return (
        <SideBarContext.Provider value={values}>
            {children}
        </SideBarContext.Provider>
    );
};
