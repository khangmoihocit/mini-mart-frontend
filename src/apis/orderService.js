import { apiPrivate } from '@apis/axiosClient';

export default class orderService {

    static createOrder = async (data) => {
        return await apiPrivate.post('/orders', data);
    };


    static getMyOrders = async (page = 1, size = 10) => {
        return await apiPrivate.get(`/orders/my-orders?page=${page}&size=${size}`);
    };


    static getOrderById = async (orderId) => {
        return await apiPrivate.get(`/orders/${orderId}`);
    };


    static cancelOrder = async (orderId) => {
        return await apiPrivate.put(`/orders/${orderId}/cancel`);
    };


    static updateOrderStatus = async (orderId, data) => {
        return await apiPrivate.put(`/orders/admin/${orderId}/status`, data);
    };


    static getAllOrdersAdmin = async (page = 1, size = 10) => {
        return await apiPrivate.get(`/orders/admin/all?page=${page}&size=${size}`);
    };


    static getOrdersByStatusAdmin = async (status, page = 1, size = 10) => {
        return await apiPrivate.get(`/orders/admin/status/${status}?page=${page}&size=${size}`);
    };


    static deleteOrderAdmin = async (orderId) => {
        return await apiPrivate.delete(`/orders/admin/${orderId}`);
    };
}

export const createOrder = orderService.createOrder;
export const getMyOrders = orderService.getMyOrders;
export const getOrderById = orderService.getOrderById;
export const cancelOrder = orderService.cancelOrder;
export const updateOrderStatus = orderService.updateOrderStatus;
export const getAllOrdersAdmin = orderService.getAllOrdersAdmin;
export const getOrdersByStatusAdmin = orderService.getOrdersByStatusAdmin;
export const deleteOrderAdmin = orderService.deleteOrderAdmin;
