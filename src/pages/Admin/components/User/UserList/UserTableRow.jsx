import React, { memo, useContext, useState } from 'react';
import styles from './styles.module.scss';
import { AdminContext } from '@/contexts/AdminProvider';
import { useHighlight } from '@/hooks/useHighlight';
import { UserContext, UserProvider } from '@/contexts/UserProvider';

const UserTableRow = memo(({ user, isSelected, onToggleSelect, onDelete, keyword }) => {
    const { actions, editBtn, deleteBtn, highlight } = styles;
    const [isDeleting, setIsDeleting] = useState(false);
    const { type, setType } = useContext(AdminContext);
    const { setSelectedUser, selectedUser } = useContext(UserContext);
    const { highlightText } = useHighlight();

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
            <td>{highlightText(user.fullName, keyword, highlight)}</td>
            <td>{highlightText(user.email, keyword, highlight)}</td>
            <td>{highlightText(user.phoneNumber, keyword, highlight)}</td>
            <td>{highlightText(user.address, keyword, highlight)}</td>
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