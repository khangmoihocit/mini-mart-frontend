import React, { memo, useState } from 'react';
import styles from './styles.module.scss';
import { LoadingButton } from '@/components/LoadingOverlay/LoadingOverlay';

const UserTableRow = memo(({ user, isSelected, onToggleSelect, onDelete }) => {
    const { actions, editBtn, deleteBtn } = styles;
    const [isDeleting, setIsDeleting] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const handleEdit = () => {
        // TODO: Implement edit functionality
        console.log('Edit user:', user.id);
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
                    {user.isActive ? 'Đang hoạt động' : 'Đã khóa'}
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