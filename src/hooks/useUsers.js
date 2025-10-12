import { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Sử dụng react-toastify để thông báo
import userService from '@/apis/userService';
import { formatErrorMessage } from '@/utils/helpers';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [error, setError] = useState('');

    const getAllUsers = async () => {
        setLoading(true);
        try {
            const response = await userService.getAll();
            setUsers(response.data.result);
        } catch (error) {
            setError(formatErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

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
            toast.error(formatErrorMessage(error));
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
        getAllUsers,
        deleteUser,
        updateUser,
        toggleUserSelection,
        toggleAllUsers,
        error
    };
};