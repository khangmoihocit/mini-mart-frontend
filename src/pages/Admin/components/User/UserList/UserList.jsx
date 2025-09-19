import React, { memo, useCallback } from 'react';
import styles from './styles.module.scss';
import HeaderMainContent from '@/pages/Admin/components/HeaderMainContent/HeaderMainContent';
import Toolbar from '@/pages/Admin/components/Toolbar/Toolbar';
import { useUsers } from '@/hooks/useUsers';
import UserTableRow from './UserTableRow';
import LoadingOverlay, { SkeletonLoader } from '@/components/LoadingOverlay/LoadingOverlay';
import toast from '@/utils/toast';

const UserList = memo(() => {
    const {
        tableContainer,
        productTable,
        errorMessage,
        emptyState
    } = styles;

    const {
        users,
        loading,
        error,
        selectedUsers,
        toggleUserSelection,
        toggleAllUsers,
        isAllSelected,
        deleteUser,
        refreshUsers
    } = useUsers();

    const handleDeleteUser = useCallback(async (userId) => {
        toast.action(
            'Bạn có chắc chắn muốn xóa người dùng này?',
            'Xác nhận',
            async () => {
                const loadingToast = toast.loading('Đang xóa người dùng...');
                try {
                    await deleteUser(userId);
                    toast.updateToSuccess(loadingToast, 'Xóa người dùng thành công!');
                } catch (error) {
                    toast.updateToError(loadingToast, 'Không thể xóa người dùng. Vui lòng thử lại!');
                    console.error('Failed to delete user:', error);
                }
            },
            {
                autoClose: 8000,
            }
        );
    }, [deleteUser]);

    const handleRefresh = useCallback(() => {
        const loadingToast = toast.loading('Đang tải dữ liệu...');
        
        try {
            refreshUsers();
            toast.updateToSuccess(loadingToast, 'Cập nhật dữ liệu thành công!');
        } catch (error) {
            toast.updateToError(loadingToast, 'Không thể tải dữ liệu. Vui lòng thử lại!');
        }
    }, [refreshUsers]);

    if (loading && users.length === 0) {
        return (
            <div>
                <HeaderMainContent
                    title={'Danh sách người dùng'}
                    navigate={'Dashboard > Khách hàng > Danh sách người dùng'}
                />
                <LoadingOverlay 
                    isLoading={true} 
                    message="Đang tải danh sách người dùng..."
                    size="large"
                />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <HeaderMainContent
                title={'Danh sách người dùng'}
                navigate={'Dashboard > Khách hàng > Danh sách người dùng'}
            />

            {/* Toolbar */}
            <Toolbar onRefresh={handleRefresh} selectedCount={selectedUsers.length} />

            {/* Error handling */}
            {error && (
                <div className={errorMessage}>
                    {error}
                </div>
            )}

            {/* Bảng người dùng */}
            <LoadingOverlay 
                isLoading={loading && users.length > 0} 
                message="Đang cập nhật dữ liệu..."
                size="medium"
            >
                <div className={tableContainer}>
                    {users.length === 0 && !loading ? (
                        <div className={emptyState}>
                            Không có dữ liệu người dùng
                        </div>
                    ) : (
                        <table className={productTable}>
                            <thead>
                                <tr>
                                    <th>
                                        <input 
                                            type='checkbox' 
                                            checked={isAllSelected}
                                            onChange={toggleAllUsers}
                                        />
                                    </th>
                                    <th>Họ và tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Trạng thái</th>
                                    <th>Ngày sinh</th>
                                    <th>Quyền</th>
                                    <th>Ngày tạo</th>
                                    <th>Cập nhật lần cuối</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <UserTableRow
                                        key={user.id}
                                        user={user}
                                        isSelected={selectedUsers.includes(user.id)}
                                        onToggleSelect={() => toggleUserSelection(user.id)}
                                        onDelete={() => handleDeleteUser(user.id)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </LoadingOverlay>
        </div>
    );
});

UserList.displayName = 'UserList';

export default UserList;
