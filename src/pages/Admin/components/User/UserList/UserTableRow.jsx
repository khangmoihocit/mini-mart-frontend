import React, { memo, useContext, useState } from 'react';
import styles from './styles.module.scss';
import { AdminContext } from '@/contexts/AdminProvider';

const UserTableRow = memo(({ user, isSelected, onToggleSelect, onDelete }) => {
    const { actions, editBtn, deleteBtn } = styles;
    const [isDeleting, setIsDeleting] = useState(false);
    const { type, setType, setSelectedUser } = useContext(AdminContext);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const handleEdit = () => {
        setSelectedUser(user);
        setType('user-update');
    };

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete();
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <tr>
            <td>
                <input
                    type='checkbox'
                    checked={isSelected}
                    onChange={onToggleSelect}
                />
            </td>
            <td>{user.fullName || ''}</td>
            <td>{user.email || ''}</td>
            <td>{user.phoneNumber || ''}</td>
            <td>{user.address || ''}</td>
            <td>
                <span className={user.isActive ? 'status-active' : 'status-inactive'}>
                    {user.isActive ? 'active' : 'locked'}
                </span>
            </td>
            <td>{formatDate(user.dateOfBirth)}</td>
            <td>{user.role?.name || ''}</td>
            <td>{formatDate(user.createdAt)}</td>
            <td>{formatDate(user.updatedAt)}</td>
            <td>
                <div className={actions}>
                    <button
                        className={editBtn}
                        onClick={handleEdit}
                        type="button"
                    >
                        Sửa
                    </button>
                    <button
                        loading={isDeleting}
                        loadingText="Đang xóa..."
                        onClick={handleDelete}
                        className={deleteBtn}
                    >
                        Xóa
                    </button>
                </div>
            </td>
        </tr>
    );
});

UserTableRow.displayName = 'UserTableRow';

export default UserTableRow;