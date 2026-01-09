import { apiPrivate, apiPublic } from './axiosClient';

const reviewService = {
    // Tạo đánh giá mới (USER, ADMIN)
    createReview: (data) => {
        return apiPrivate.post('/reviews', data);
    },

    // Cập nhật đánh giá (USER, ADMIN)
    updateReview: (reviewId, data) => {
        return apiPrivate.put(`/reviews/${reviewId}`, data);
    },

    // Xóa đánh giá (USER, ADMIN)
    deleteReview: (reviewId) => {
        return apiPrivate.delete(`/reviews/${reviewId}`);
    },

    // Lấy thông tin đánh giá theo ID (Public)
    getReviewById: (reviewId) => {
        return apiPublic.get(`/reviews/${reviewId}`);
    },

    // Lấy danh sách đánh giá theo sản phẩm (Public)
    getReviewsByProduct: (productId) => {
        return apiPublic.get(`/reviews/product/${productId}`);
    },

    // Lấy đánh giá của tôi (USER, ADMIN)
    getMyReviews: () => {
        return apiPrivate.get('/reviews/my-reviews');
    },

    // Lấy thống kê đánh giá sản phẩm (Public)
    getProductRating: (productId) => {
        return apiPublic.get(`/reviews/product/${productId}/rating`);
    },

    // Lấy tất cả đánh giá (ADMIN)
    getAllReviews: () => {
        return apiPrivate.get('/reviews/all');
    }
};

export default reviewService;
