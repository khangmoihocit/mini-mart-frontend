import { useState, useEffect, useContext } from 'react';
import reviewService from '@/apis/reviewService';
import RatingStars from '@/components/RatingStars/RatingStars';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import LoadingTextCommon from '@/components/LoadingTextCommon/LoadingTextCommon';
import { ToastContext } from '@/contexts/ToastProvider';
import { formatErrorMessage } from '@/utils/helpers';
import styles from './styles.module.scss';

function ReviewManagement() {
    const [reviews, setReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRating, setFilterRating] = useState('all');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);
    const { toast } = useContext(ToastContext);

    useEffect(() => {
        loadAllReviews();
    }, []);

    useEffect(() => {
        filterReviews();
    }, [reviews, searchTerm, filterRating]);

    const loadAllReviews = async () => {
        try {
            setIsLoading(true);
            const response = await reviewService.getAllReviews();
            if (response.data?.result) {
                setReviews(response.data.result);
            }
        } catch (error) {
            const errorMsg = formatErrorMessage(error);
            toast.error(errorMsg || 'Không thể tải danh sách đánh giá');
        } finally {
            setIsLoading(false);
        }
    };

    const filterReviews = () => {
        let filtered = [...reviews];

        // Filter by search term (product name or user name)
        if (searchTerm) {
            filtered = filtered.filter(
                (review) =>
                    review.productName
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    review.userName?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by rating
        if (filterRating !== 'all') {
            filtered = filtered.filter(
                (review) => review.rating === parseInt(filterRating)
            );
        }

        setFilteredReviews(filtered);
    };

    const handleDeleteClick = (reviewId) => {
        setSelectedReviewId(reviewId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await reviewService.deleteReview(selectedReviewId);
            if (response.data?.code === 0) {
                toast.success('Đã xóa đánh giá thành công');
                loadAllReviews();
            }
        } catch (error) {
            const errorMsg = formatErrorMessage(error);
            toast.error(errorMsg || 'Không thể xóa đánh giá');
        } finally {
            setShowDeleteModal(false);
            setSelectedReviewId(null);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <LoadingTextCommon />
            </div>
        );
    }

    return (
        <div className={styles.reviewManagement}>
            <div className={styles.header}>
                <h1>Quản lý đánh giá</h1>
                <div className={styles.stats}>
                    <span>Tổng số đánh giá: {reviews.length}</span>
                </div>
            </div>

            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên sản phẩm hoặc người dùng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
                <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className={styles.filterSelect}
                >
                    <option value="all">Tất cả đánh giá</option>
                    <option value="5">5 sao</option>
                    <option value="4">4 sao</option>
                    <option value="3">3 sao</option>
                    <option value="2">2 sao</option>
                    <option value="1">1 sao</option>
                </select>
            </div>

            {filteredReviews.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>Không tìm thấy đánh giá nào</p>
                </div>
            ) : (
                <div className={styles.reviewsTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Người đánh giá</th>
                                <th>Email</th>
                                <th>Đánh giá</th>
                                <th>Nhận xét</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReviews.map((review) => (
                                <tr key={review.id}>
                                    <td>
                                        <div className={styles.productName}>
                                            {review.productName}
                                        </div>
                                    </td>
                                    <td>{review.userName}</td>
                                    <td>{review.userEmail}</td>
                                    <td>
                                        <RatingStars
                                            rating={review.rating}
                                            size="small"
                                        />
                                    </td>
                                    <td>
                                        <div className={styles.comment}>
                                            {review.comment || '-'}
                                        </div>
                                    </td>
                                    <td className={styles.date}>
                                        {formatDate(review.createdAt)}
                                    </td>
                                    <td>
                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => handleDeleteClick(review.id)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showDeleteModal && (
                <ConfirmationModal
                    isOpen={showDeleteModal}
                    message="Bạn có chắc chắn muốn xóa đánh giá này?"
                    onConfirm={handleConfirmDelete}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setSelectedReviewId(null);
                    }}
                />
            )}
        </div>
    );
}

export default ReviewManagement;
