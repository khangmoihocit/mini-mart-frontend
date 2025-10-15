import { createContext, useContext, useEffect, useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { UserInfoContext } from '@/contexts/UserInfoProvider';

export const AdminContext = createContext();
//khởi tạo cung cấp các state cho các component con
export const AdminProvider = ({ children }) => {
    const [type, setType] = useState('product-list');
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null); //user được click từ button sửa

    const { token, userCurrent } = useContext(UserInfoContext);
    const { users, loading, error, setUsers, selectedUsers, toggleUserSelection, toggleAllUsers, fetchUsers } = useUsers();

    useEffect(() => {
        setUsers([]);
        fetchUsers();
    }, [token]);

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
        refreshUsers: fetchUsers,
        deleteUser: useUsers().deleteUser,
        setUsers,
        selectedUsers,  
        toggleUserSelection,
        toggleAllUsers
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};