import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Button from '@components/Button/Button';
import RatingStars from '@/components/RatingStars/RatingStars';
import ReviewCard from '@/components/ReviewCard/ReviewCard';
import reviewService from '@/apis/reviewService';
import { ToastContext } from '@/contexts/ToastProvider';
import { formatErrorMessage } from '@/utils/helpers';
import styles from '../styles.module.scss';

function ReviewProduct({ productName }) {
    const {
        reviews,
        containerReview,
        noreview,
        replyForm,
        commentReplyTitle,
        commentTotes,
        btnSubmit
    } = styles;

    const param = useParams();
    const productId = param.id;
    const { toast } = useContext(ToastContext);
    const userId = Cookies.get('userId');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // States cho reviews
    const [reviewsListData, setReviewsListData] = useState([]);
    const [ratingStatsData, setRatingStatsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // States cho form
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hasUserReview, setHasUserReview] = useState(false);

    // Check authentication
    useEffect(() => {
        const token = Cookies.get('token');
        setIsAuthenticated(!!token && !!userId);
    }, [userId]);

    // Load reviews và rating stats
    useEffect(() => {
        if (productId) {
            loadReviews();
            loadRatingStats();
        }
    }, [productId]);

    const loadReviews = async () => {
        try {
            setIsLoading(true);
            const response = await reviewService.getReviewsByProduct(productId);
            console.log('Reviews response:', response);
            console.log('Response structure check:', {
                hasData: !!response?.data,
                hasResult: !!response?.result,
                dataResult: response?.data?.result,
                directResult: response?.result,
                isArray: Array.isArray(response?.data?.result) || Array.isArray(response?.result)
            });
            
            // Try multiple possible response structures
            let reviewsData = [];
            if (response?.data?.result && Array.isArray(response.data.result)) {
                reviewsData = response.data.result;
            } else if (response?.result && Array.isArray(response.result)) {
                reviewsData = response.result;
            } else if (Array.isArray(response?.data)) {
                reviewsData = response.data;
            } else if (Array.isArray(response)) {
                reviewsData = response;
            }
            
            console.log('Final reviews data:', reviewsData);
            console.log('Reviews count:', reviewsData.length);
            setReviewsListData(reviewsData);
            
            // Check if user already reviewed
            if (userId && reviewsData.length > 0) {
                console.log('Checking user review for userId:', userId);
                const userReview = reviewsData.find(
                    (review) => {
                        console.log('Comparing:', review.userId, 'with', userId);
                        return review.userId === userId;
                    }
                );
                console.log('User review found:', userReview);
                setHasUserReview(!!userReview);
            }
        } catch (error) {
            console.error('Error loading reviews:', error);
            setReviewsListData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const loadRatingStats = async () => {
        try {
            const response = await reviewService.getProductRating(productId);
            console.log('Rating stats response:', response);
            const statsData = response?.data?.result || response?.result;
            console.log('Rating stats data:', statsData);
            if (statsData) {
                setRatingStatsData(statsData);
            }
        } catch (error) {
            console.error('Error loading rating stats:', error);
        }
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            toast.error('Vui lòng đăng nhập để đánh giá sản phẩm');
            return;
        }

        if (rating === 0) {
            toast.error('Vui lòng chọn số sao đánh giá');
            return;
        }

        if (comment.length > 1000) {
            toast.error('Nhận xét không được vượt quá 1000 ký tự');
            return;
        }

        try {
            setIsSubmitting(true);
            const data = {
                productId,
                rating,
                comment: comment.trim() || undefined
            };

            const response = await reviewService.createReview(data);
            console.log('Create review response:', response);
            
            if (response?.data?.code === 0 || response?.status === 200) {
                toast.success('Đánh giá của bạn đã được gửi thành công!');
                setRating(0);
                setComment('');
                setHasUserReview(true);
                // Reload reviews
                await loadReviews();
                await loadRatingStats();
            }
        } catch (error) {
            const errorMsg = formatErrorMessage(error);
            toast.error(errorMsg || 'Có lỗi xảy ra khi gửi đánh giá');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateReview = async (reviewId, data) => {
        try {
            const response = await reviewService.updateReview(reviewId, data);
            
            if (response?.data?.code === 0 || response?.status === 200) {
                toast.success('Cập nhật đánh giá thành công!');
                await loadReviews();
                await loadRatingStats();
            }
        } catch (error) {
            const errorMsg = formatErrorMessage(error);
            toast.error(errorMsg || 'Có lỗi xảy ra khi cập nhật đánh giá');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await reviewService.deleteReview(reviewId);
            
            if (response?.data?.code === 0 || response?.status === 200) {
                toast.success('Đã xóa đánh giá');
                setHasUserReview(false);
                await loadReviews();
                await loadRatingStats();
            }
        } catch (error) {
            const errorMsg = formatErrorMessage(error);
            toast.error(errorMsg || 'Có lỗi xảy ra khi xóa đánh giá');
        }
    };

    const renderRatingDistribution = () => {
        if (!ratingStatsData?.ratingDistribution) return null;

        return [5, 4, 3, 2, 1].map((star) => {
            const count = ratingStatsData.ratingDistribution[star] || 0;
            const percentage = ratingStatsData.totalReviews > 0
                ? (count / ratingStatsData.totalReviews) * 100
                : 0;

            return (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
                    <span style={{ minWidth: '50px', color: '#666' }}>{star} sao</span>
                    <div style={{ flex: 1, height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                            style={{ 
                                width: `${percentage}%`, 
                                height: '100%', 
                                background: '#ffc107',
                                transition: 'width 0.3s ease'
                            }}
                        />
                    </div>
                    <span style={{ minWidth: '40px', textAlign: 'right', color: '#666' }}>{count}</span>
                </div>
            );
        });
    };

    return (
        <div className={containerReview}>
            <div className={reviews}>Đánh giá</div>

            {/* Rating Statistics */}
            {ratingStatsData && ratingStatsData.totalReviews > 0 && (
                <div style={{ display: 'flex', gap: '40px', padding: '30px 0', borderBottom: '1px solid #e1e1e1', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', minWidth: '200px' }}>
                        <div style={{ fontSize: '48px', fontWeight: 'bold' }}>
                            {ratingStatsData.averageRating.toFixed(1)}
                        </div>
                        <RatingStars
                            rating={ratingStatsData.averageRating}
                            size="large"
                        />
                        <div style={{ color: '#666', marginTop: '8px' }}>
                            {ratingStatsData.totalReviews} đánh giá
                        </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                        {renderRatingDistribution()}
                    </div>
                </div>
            )}

            {/* Reviews List */}
            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#666', fontSize: '16px' }}>
                    Đang tải đánh giá...
                </div>
            ) : reviewsListData.length > 0 ? (
                <div style={{ marginBottom: '30px' }}>
                    {reviewsListData.map((review) => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                            onUpdate={handleUpdateReview}
                            onDelete={handleDeleteReview}
                            currentUserId={userId}
                            isAdmin={false}
                        />
                    ))}
                </div>
            ) : (
                <p className={noreview}>Chưa có đánh giá nào.</p>
            )}

            {/* Review Form */}
            {isAuthenticated && !hasUserReview && (
                <div className={replyForm}>
                    <div className={commentReplyTitle}>
                        HÃY LÀ NGƯỜI ĐẦU TIÊN ĐÁNH GIÁ "{productName || 'SẢN PHẨM NÀY'}"
                    </div>

                    <p className={commentTotes}>
                        Chia sẻ trải nghiệm của bạn về sản phẩm này. Đánh giá của bạn
                        sẽ giúp người mua khác có thêm thông tin tham khảo.
                    </p>

                    <form onSubmit={handleSubmitReview}>
                        {/* RATING */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
                                Đánh giá của bạn <span style={{ color: 'red' }}>*</span>
                            </label>
                            <RatingStars
                                rating={rating}
                                onRatingChange={setRating}
                                size="large"
                            />
                        </div>

                        {/* COMMENT */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '500' }}>
                                Nhận xét của bạn
                            </label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={8}
                                maxLength={1000}
                                placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    fontFamily: 'inherit',
                                    resize: 'vertical'
                                }}
                            />
                            <div style={{ textAlign: 'right', fontSize: '12px', color: '#999', marginTop: '4px' }}>
                                {comment.length}/1000
                            </div>
                        </div>

                        <div className={btnSubmit}>
                            <Button
                                content={isSubmitting ? 'ĐANG GỬI...' : 'GỬI ĐÁNH GIÁ'}
                                type="submit"
                                disabled={isSubmitting || rating === 0}
                            />
                        </div>
                    </form>
                </div>
            )}

            {!isAuthenticated && (
                <div className={replyForm}>
                    <p className={commentTotes}>
                        Vui lòng <a href="/login" style={{ color: '#667eea', fontWeight: '500' }}>đăng nhập</a> để đánh giá sản phẩm.
                    </p>
                </div>
            )}

            {isAuthenticated && hasUserReview && (
                <div className={replyForm}>
                    <p className={commentTotes} style={{ color: '#4CAF50' }}>
                        Bạn đã đánh giá sản phẩm này. Bạn có thể chỉnh sửa hoặc xóa đánh giá của mình ở phía trên.
                    </p>
                </div>
            )}
        </div>
    );
}

export default ReviewProduct;
