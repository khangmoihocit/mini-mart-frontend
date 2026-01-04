import { useState } from 'react';
import RatingStars from '@/components/RatingStars/RatingStars';
import Button from '@components/Button/Button';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import styles from './styles.module.scss';

function ReviewCard({ review, onUpdate, onDelete, currentUserId, isAdmin }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editRating, setEditRating] = useState(review.rating);
    const [editComment, setEditComment] = useState(review.comment || '');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const isOwner = currentUserId === review.userId;
    const canEdit = isOwner;
    const canDelete = isOwner || isAdmin;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleSaveEdit = () => {
        onUpdate(review.id, { rating: editRating, comment: editComment });
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditRating(review.rating);
        setEditComment(review.comment || '');
        setIsEditing(false);
    };

    const handleConfirmDelete = () => {
        onDelete(review.id);
        setShowDeleteModal(false);
    };

    return (
        <div className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
                <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>
                        {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userDetails}>
                        <h4 className={styles.userName}>{review.userName}</h4>
                        <span className={styles.reviewDate}>
                            {formatDate(review.createdAt)}
                        </span>
                    </div>
                </div>
                <div style={{display:'flex', gap:'10px'}}>
                    {canEdit && !isEditing && (
                    <div className={styles.actions}>
                        <Button
                            content="Sửa"
                            isPrimary={true}
                            onClick={() => setIsEditing(true)}
                        />
                    </div>
                )}
                {canDelete && !isEditing && (
                    <div className={styles.actions}>
                        <Button
                            content="Xóa"
                            isPrimary={false}
                            onClick={() => setShowDeleteModal(true)}
                        />
                    </div>
                )}
                </div>
            </div>

            <div className={styles.reviewContent}>
                {isEditing ? (
                    <div className={styles.editForm}>
                        <div className={styles.formGroup}>
                            <label>Đánh giá của bạn:</label>
                            <RatingStars
                                rating={editRating}
                                onRatingChange={setEditRating}
                                size="medium"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label>Nhận xét:</label>
                            <textarea
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                                maxLength={1000}
                                rows={4}
                                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                            />
                            <span className={styles.charCount}>
                                {editComment.length}/1000
                            </span>
                        </div>
                        <div className={styles.editActions}>
                            <Button content="Lưu" onClick={handleSaveEdit} />
                            <Button
                                content="Hủy"
                                onClick={handleCancelEdit}
                                variant="outline"
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <RatingStars rating={review.rating} size="small" />
                        {review.comment && (
                            <p className={styles.reviewComment}>{review.comment}</p>
                        )}
                    </>
                )}
            </div>

            {showDeleteModal && (
                <ConfirmationModal
                    isOpen={showDeleteModal}
                    message="Bạn có chắc chắn muốn xóa đánh giá này?"
                    onConfirm={handleConfirmDelete}
                    onClose={() => setShowDeleteModal(false)}
                />
            )}
        </div>
    );
}

export default ReviewCard;
