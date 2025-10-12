import React from 'react';
import styles from './styles.module.scss';
import HeaderMainContent from '@/pages/Admin/components/HeaderMainContent/HeaderMainContent';
import Toolbar from '@/pages/Admin/components/Toolbar/Toolbar';
import { useUsers } from '@/hooks/useUsers';
import UserTableRow from './UserTableRow';
import LoadingOverlay from '@/components/LoadingOverlay/LoadingOverlay';
import Message from '@/components/Message/Message';

const UserList = () => {
    const { tableContainer, productTable, emptyState } = styles;

    const {
        users,
        loading,
        selectedUsers,
        toggleUserSelection,
        toggleAllUsers,
        deleteUser,
        getAllUsers,
        error
    } = useUsers();

    const isAllSelected = users.length > 0 && selectedUsers.length === users.length;

    if (loading && users.length === 0) {
        return (
            <div>
                <HeaderMainContent
                    title={'Danh sách người dùng'}
                    navigate={'Dashboard > Khách hàng > Danh sách người dùng'}
                />
                <LoadingOverlay
                    isLoading={true}
                    message='Đang tải danh sách người dùng...'
                />
            </div>
        );
    }

    return (
        <div>
            <HeaderMainContent
                title={'Danh sách người dùng'}
                navigate={'Dashboard > Khách hàng > Danh sách người dùng'}
            />

            <Toolbar
                onRefresh={getAllUsers}
                selectedCount={selectedUsers.length}
            />

            {error && <Message content={error} type='error' />}

            <LoadingOverlay
                isLoading={loading && users.length > 0}
                message='Đang cập nhật dữ liệu...'
            >
                <div className={tableContainer}>
                    {users.length === 0 ? (
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
                                    <th>Cập nhật</th>
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
                                        onDelete={() => deleteUser(user.id)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </LoadingOverlay>
        </div>
    );
};

export default UserList;