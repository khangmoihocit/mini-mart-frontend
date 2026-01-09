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

    static addToCart = async (data) => {
        return await apiPrivate.post('/cart/add', data);
    };


    static updateCartItem = async (cartItemId, data) => {
        return await apiPrivate.put(`/cart/items/${cartItemId}`, data);
    };


    static removeFromCart = async (cartItemId) => {
        return await apiPrivate.delete(`/cart/items/${cartItemId}`);
    };


    static clearCart = async () => {
        return await apiPrivate.delete('/cart/clear');
    };


    static getCartCount = async () => {
        return await apiPrivate.get('/cart/count');
    };
}