import { createContext, useState } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [type, setType] = useState('product-list');
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    // Đối tượng value giờ đây được tạo trực tiếp
    // và chỉ được tạo lại khi một trong các giá trị state thay đổi.
    const contextValue = {
        type,
        setType,
        isOpenSidebar,
        setIsOpenSidebar,
        selectedUser,
        setSelectedUser
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};