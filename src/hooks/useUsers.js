import { useContext } from 'react';
import { UserContext } from '@/contexts/UserProvider';

/**
 * Hook để truy cập và xử lý các actions liên quan đến User
 * Lấy dữ liệu từ UserContext
 */
export const useUsers = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('useUsers must be used within UserProvider');
    }

    const {
        users,
        loading,
        selectedUsers,
        error,
        keyword,
        pagination,
        fetchUsers,
        deleteUser,
        updateUser,
        setSelectedUsers,
        setKeyword,
        setPagination
    } = context;

    const handlePageChange = (page) => {
        setPagination(prev => ({ ...prev, page }));
    };

    const handleItemsPerPageChange = (limit) => {
        setPagination(prev => ({ ...prev, page: 1, limit }));
    };

    const handleSearch = (searchKeyword) => {
        setKeyword(searchKeyword);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const toggleUserSelection = (userId) => {
        setSelectedUsers(currentSelected =>
            currentSelected.includes(userId)
                ? currentSelected.filter(id => id !== userId)
                : [...currentSelected, userId]
        );
    };

    const toggleAllUsers = () => {
        if (selectedUsers.length === users.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(users.map(user => user.id));
        }
    };

    return {
        users,
        loading,
        selectedUsers,
        error,
        keyword,
        pagination,
        fetchUsers,
        deleteUser,
        updateUser,
        toggleUserSelection,
        toggleAllUsers,
        handlePageChange,
        handleItemsPerPageChange,
        handleSearch
    };
};