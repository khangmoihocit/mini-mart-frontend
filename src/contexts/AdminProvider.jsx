import { use } from 'react';
import { createContext, useEffect, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [type, setType] = useState('product-list');
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);

    const values = { type, setType , isOpenSidebar, setIsOpenSidebar};

    return (
        <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
    );
};
