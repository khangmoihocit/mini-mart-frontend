import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import userService from '@/apis/userService';
import { formatErrorMessage } from '@/utils/helpers';

//hook để quản lý stata và logic liên quan
export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 1,
        totalItems: 0,
    });

    const fetchUsers = async (page, limit) => {
        setLoading(true);
        try {
            const response = await userService.search(page, limit, '');
            const { content, totalPages, totalElements, number } = response.data.result;

            setUsers(content);
            setPagination(prev => ({
                ...prev,
                page: number + 1,
                totalPages,
                totalItems: totalElements,
            }));
            setError(null);
        } catch (error) {
            setError(formatErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(pagination.page, pagination.limit);
    }, [pagination.page, pagination.limit]);

    const handlePageChange = (page) => {
        setPagination(prev => ({ ...prev, page }));
    };

    const handleItemsPerPageChange = (limit) => {
        setPagination(prev => ({ ...prev, page: 1, limit }));
    };

    const deleteUser = async (userId) => {
        try {
            await userService.delete(userId);
            setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
            toast.success('Xóa người dùng thành công!');
        } catch (error) {
            toast.error(formatErrorMessage(error));
        }
    };

    const updateUser = async (userId, userData) => {
        try {
            const response = await userService.update(userId, userData);
            setUsers(currentUsers =>
                currentUsers.map(user =>
                    user.id === userId ? response.data.result : user
                )
            );
            toast.success('Cập nhật thành công!');
        } catch (error) {
            setError(formatErrorMessage(error));
        }
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
        pagination,
        fetchUsers,
        deleteUser,
        updateUser,
        toggleUserSelection,
        toggleAllUsers,
        setUsers,
        handlePageChange,
        handleItemsPerPageChange
    };
};