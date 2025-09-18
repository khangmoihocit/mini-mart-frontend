import { useState, useEffect, useCallback, useMemo } from 'react';
import userService from '@/apis/userService';
import { formatErrorMessage } from '@/utils/helpers';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);

    // Cache để tránh gọi API liên tục
    const [lastFetch, setLastFetch] = useState(null);
    const CACHE_TIME = 5 * 60 * 1000; // 5 phút

    const getAllUsers = useCallback(async (forceRefresh = false) => {
        // Kiểm tra cache trước khi gọi API
        if (!forceRefresh && lastFetch && Date.now() - lastFetch < CACHE_TIME && users.length > 0) {
            return;
        }

        setLoading(true);
        setError(null);
        
        try {
            const response = await userService.getAll();
            setUsers(response.data.result);
            setLastFetch(Date.now());
        } catch (error) {
            const errorMsg = formatErrorMessage(error);
            setError(errorMsg);
            console.error('Error fetching users:', errorMsg);
        } finally {
            setLoading(false);
        }
    }, [users.length, lastFetch]);

    const deleteUser = useCallback(async (userId) => {
        try {
            await userService.delete(userId);
            setUsers(prev => prev.filter(user => user.id !== userId));
            setSelectedUsers(prev => prev.filter(id => id !== userId));
        } catch (error) {
            const errorMsg = formatErrorMessage(error);
            setError(errorMsg);
            throw error;
        }
    }, []);

    const updateUser = useCallback(async (userId, userData) => {
        try {
            const response = await userService.update(userId, userData);
            setUsers(prev => prev.map(user => 
                user.id === userId ? response.data.result : user
            ));
        } catch (error) {
            const errorMsg = formatErrorMessage(error);
            setError(errorMsg);
            throw error;
        }
    }, []);

    // Selection handlers
    const toggleUserSelection = useCallback((userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    }, []);

    const toggleAllUsers = useCallback(() => {
        setSelectedUsers(prev => 
            prev.length === users.length ? [] : users.map(user => user.id)
        );
    }, [users]);

    const clearSelection = useCallback(() => {
        setSelectedUsers([]);
    }, []);

    // Memoized computed values
    const isAllSelected = useMemo(() => 
        users.length > 0 && selectedUsers.length === users.length, 
        [users.length, selectedUsers.length]
    );

    const selectedCount = useMemo(() => selectedUsers.length, [selectedUsers.length]);

    // Auto fetch on mount
    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    return {
        // Data
        users,
        loading,
        error,
        selectedUsers,
        
        // Actions
        getAllUsers,
        deleteUser,
        updateUser,
        
        // Selection
        toggleUserSelection,
        toggleAllUsers,
        clearSelection,
        
        // Computed
        isAllSelected,
        selectedCount,
        
        // Utils
        refreshUsers: () => getAllUsers(true)
    };
};