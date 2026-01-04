import { apiPrivate } from '@apis/axiosClient';

export default class cartService {
    /**
     * Lấy giỏ hàng của user
     * GET /api/v1/cart
     * @returns {Promise}
     */
    static getCart = async () => {
        return await apiPrivate.get('/cart');
    };

    /**
     * Thêm sản phẩm vào giỏ hàng
     * POST /api/v1/cart/add
     * @param {Object} data - { productId, productSizeId?, quantity }
     * @returns {Promise}
     */
    static addToCart = async (data) => {
        return await apiPrivate.post('/cart/add', data);
    };

    /**
     * Cập nhật số lượng sản phẩm trong giỏ hàng
     * PUT /api/v1/cart/items/{cartItemId}
     * @param {string} cartItemId - ID của cart item
     * @param {Object} data - { quantity }
     * @returns {Promise}
     */
    static updateCartItem = async (cartItemId, data) => {
        return await apiPrivate.put(`/cart/items/${cartItemId}`, data);
    };

    /**
     * Xóa sản phẩm khỏi giỏ hàng
     * DELETE /api/v1/cart/items/{cartItemId}
     * @param {string} cartItemId - ID của cart item
     * @returns {Promise}
     */
    static removeFromCart = async (cartItemId) => {
        return await apiPrivate.delete(`/cart/items/${cartItemId}`);
    };

    /**
     * Xóa toàn bộ giỏ hàng
     * DELETE /api/v1/cart/clear
     * @returns {Promise}
     */
    static clearCart = async () => {
        return await apiPrivate.delete('/cart/clear');
    };

    /**
     * Lấy số lượng items trong giỏ hàng
     * GET /api/v1/cart/count
     * @returns {Promise} - Returns count of items
     */
    static getCartCount = async () => {
        return await apiPrivate.get('/cart/count');
    };
}