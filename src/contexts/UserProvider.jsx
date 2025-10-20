import { UserInfoContext } from "@/contexts/UserInfoProvider";
import userService from '@/apis/userService';
import { formatErrorMessage } from '@/utils/helpers';
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); //user được click từ button sửa
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 1,
        totalItems: 0,
    });

    const { token } = useContext(UserInfoContext);

    // Hàm fetch users
    const fetchUsers = async (page, limit, searchKeyword) => {
        setLoading(true);
        try {
            const response = await userService.search(page, limit, searchKeyword);
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

    // useEffect để fetch khi pagination hoặc keyword thay đổi
    useEffect(() => {
        if (token) {
            fetchUsers(pagination.page, pagination.limit, keyword);
        }
    }, [pagination.page, pagination.limit, keyword, token]);

    const contextValue = {
        users,
        setUsers,
        loading,
        setLoading,
        selectedUsers,
        setSelectedUsers,
        error,
        setError,
        keyword,
        setKeyword,
        pagination,
        setPagination,
        selectedUser,
        setSelectedUser,
        fetchUsers,
        deleteUser,
        updateUser,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
