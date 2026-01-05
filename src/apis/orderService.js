import { apiPrivate } from '@apis/axiosClient';

export default class orderService {
    /**
     * Tạo đơn hàng mới từ giỏ hàng
     * POST /api/v1/orders
     * @param {Object} data - { fullName, email, phoneNumber, shippingAddress, note, shippingMethod, paymentMethod }
     * @returns {Promise}
     */
    static createOrder = async (data) => {
        return await apiPrivate.post('/orders', data);
    };

    /**
     * Lấy danh sách đơn hàng của tôi (có phân trang)
     * GET /api/v1/orders/my-orders
     * @param {number} page - Số trang (default 1)
     * @param {number} size - Số items mỗi trang (default 10)
     * @returns {Promise}
     */
    static getMyOrders = async (page = 1, size = 10) => {
        return await apiPrivate.get(`/orders/my-orders?page=${page}&size=${size}`);
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
     * PUT /api/v1/orders/admin/{orderId}/status
     * @param {string} orderId - ID của đơn hàng
     * @param {Object} data - { status }
     * @returns {Promise}
     */
    static updateOrderStatus = async (orderId, data) => {
        return await apiPrivate.put(`/orders/admin/${orderId}/status`, data);
    };

    // ===== ADMIN APIs =====

    /**
     * Lấy tất cả đơn hàng (Admin)
     * GET /api/v1/orders/admin/all
     * @param {number} page - Số trang (default 1)
     * @param {number} size - Số items mỗi trang (default 10)
     * @returns {Promise}
     */
    static getAllOrdersAdmin = async (page = 1, size = 10) => {
        return await apiPrivate.get(`/orders/admin/all?page=${page}&size=${size}`);
    };

    /**
     * Lấy đơn hàng theo trạng thái (Admin)
     * GET /api/v1/orders/admin/status/{status}
     * @param {string} status - PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
     * @param {number} page - Số trang (default 1)
     * @param {number} size - Số items mỗi trang (default 10)
     * @returns {Promise}
     */
    static getOrdersByStatusAdmin = async (status, page = 1, size = 10) => {
        return await apiPrivate.get(`/orders/admin/status/${status}?page=${page}&size=${size}`);
    };

    /**
     * Xóa đơn hàng (Admin)
     * DELETE /api/v1/orders/admin/{orderId}
     * @param {string} orderId - ID của đơn hàng
     * @returns {Promise}
     */
    static deleteOrderAdmin = async (orderId) => {
        return await apiPrivate.delete(`/orders/admin/${orderId}`);
    };
}

// Export named function để tương thích với code cũ
export const createOrder = orderService.createOrder;
export const getMyOrders = orderService.getMyOrders;
export const getOrderById = orderService.getOrderById;
export const cancelOrder = orderService.cancelOrder;
export const updateOrderStatus = orderService.updateOrderStatus;
export const getAllOrdersAdmin = orderService.getAllOrdersAdmin;
export const getOrdersByStatusAdmin = orderService.getOrdersByStatusAdmin;
export const deleteOrderAdmin = orderService.deleteOrderAdmin;
