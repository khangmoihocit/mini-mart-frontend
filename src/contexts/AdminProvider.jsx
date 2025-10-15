import { createContext, useContext, useEffect, useState } from 'react';

export const AdminContext = createContext();
//khởi tạo cung cấp các state cho các component con
export const AdminProvider = ({ children }) => {
    const [type, setType] = useState('product-list');
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    
    const contextValue = {
        type,
        setType,
        isOpenSidebar,
        setIsOpenSidebar,
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};