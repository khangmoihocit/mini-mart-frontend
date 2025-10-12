import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import userService from '@/apis/userService';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [type, setType] = useState('product-list');
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    const contextValue = {
        type,
        setType,
        isOpenSidebar,
        setIsOpenSidebar,
        selectedUser,
        setSelectedUser,
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};