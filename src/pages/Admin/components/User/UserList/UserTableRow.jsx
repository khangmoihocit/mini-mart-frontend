import React, { memo, useContext, useState } from 'react';
import styles from './styles.module.scss';
import { AdminContext } from '@/contexts/AdminProvider';

const UserTableRow = memo(({ user, isSelected, onToggleSelect, onDelete, keyword }) => {
    const { actions, editBtn, deleteBtn } = styles;
    const [isDeleting, setIsDeleting] = useState(false);
    const { type, setType, setSelectedUser } = useContext(AdminContext);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    // Hàm loại bỏ dấu tiếng Việt
    const removeVietnameseTones = (str) => {
        return str
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    };

    // Hàm highlight text dựa trên keyword (không phân biệt dấu)
    const highlightText = (text, keyword) => {
        if (!text || !keyword || keyword.trim() === '') {
            return text || '';
        }

        const normalizedKeyword = removeVietnameseTones(keyword.toLowerCase());
        const normalizedText = removeVietnameseTones(String(text).toLowerCase());

        // Tìm tất cả vị trí match trong text đã normalize
        const matches = [];
        let startIndex = 0;

        while (startIndex < normalizedText.length) {
            const matchIndex = normalizedText.indexOf(normalizedKeyword, startIndex);
            if (matchIndex === -1) break;

            matches.push({
                start: matchIndex,
                end: matchIndex + normalizedKeyword.length
            });

            startIndex = matchIndex + 1;
        }

        if (matches.length === 0) {
            return text;
        }

        // Tạo các phần từ text gốc dựa trên vị trí match
        const result = [];
        let lastIndex = 0;

        matches.forEach((match, index) => {
            // Thêm phần text trước match
            if (match.start > lastIndex) {
                result.push(String(text).substring(lastIndex, match.start));
            }

            // Thêm phần match với highlight
            result.push(
                <mark key={index} className={styles.highlight}>
                    {String(text).substring(match.start, match.end)}
                </mark>
            );

            lastIndex = match.end;
        });

        // Thêm phần text còn lại
        if (lastIndex < text.length) {
            result.push(String(text).substring(lastIndex));
        }

        return result;
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
            <td>{highlightText(user.fullName, keyword)}</td>
            <td>{highlightText(user.email, keyword)}</td>
            <td>{highlightText(user.phoneNumber, keyword)}</td>
            <td>{highlightText(user.address, keyword)}</td>
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