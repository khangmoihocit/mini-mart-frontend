import { apiPrivate } from '@apis/axiosClient';

export default class orderService {
    /**
     * Tạo đơn hàng mới
     * POST /api/v1/orders
     * @param {Object} data - Thông tin đơn hàng
     * @returns {Promise}
     */
    static createOrder = async (data) => {
        return await apiPrivate.post('/orders', data);
    };

    /**
     * Lấy danh sách đơn hàng của user
     * GET /api/v1/orders
     * @returns {Promise}
     */
    static getOrders = async () => {
        return await apiPrivate.get('/orders');
    };

    /**
     * Lấy chi tiết đơn hàng
     * GET /api/v1/orders/{orderId}
     * @param {string} orderId - ID của đơn hàng
     * @returns {Promise}
     */
    static getOrderById = async (orderId) => {
        return await apiPrivate.get(`/orders/${orderId}`);
    };

    /**
     * Hủy đơn hàng
     * PUT /api/v1/orders/{orderId}/cancel
     * @param {string} orderId - ID của đơn hàng
     * @returns {Promise}
     */
    static cancelOrder = async (orderId) => {
        return await apiPrivate.put(`/orders/${orderId}/cancel`);
    };

    /**
     * Cập nhật trạng thái đơn hàng (Admin)
     * PUT /api/v1/orders/{orderId}/status
     * @param {string} orderId - ID của đơn hàng
     * @param {Object} data - { status }
     * @returns {Promise}
     */
    static updateOrderStatus = async (orderId, data) => {
        return await apiPrivate.put(`/orders/${orderId}/status`, data);
    };
}

// Export named function để tương thích với code cũ
export const createOrder = orderService.createOrder;
export const getOrders = orderService.getOrders;
export const getOrderById = orderService.getOrderById;
export const cancelOrder = orderService.cancelOrder;
export const updateOrderStatus = orderService.updateOrderStatus;
