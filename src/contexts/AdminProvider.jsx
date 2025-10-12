import { createContext, useEffect, useState } from 'react';
import { useUsers } from '@/hooks/useUsers';

export const AdminContext = createContext();

//user
export const AdminProvider = ({ children }) => {
    const [type, setType] = useState('product-list');
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    const { users, loading, error, getAllUsers, deleteUser, setUsers } = useUsers();

    useEffect(() => {
        getAllUsers();
    }, []);

    const contextValue = {
        type,
        setType,
        isOpenSidebar,
        setIsOpenSidebar,
        selectedUser,
        setSelectedUser,
        users,
        userLoading: loading,
        userError: error,
        refreshUsers: getAllUsers,
        deleteUser,
        setUsers
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};