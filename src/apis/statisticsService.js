import { apiPrivate } from './axiosClient';

// 1. Thống kê sản phẩm
export const getProductStatistics = async () => {
    try {
        const response = await apiPrivate.get('/statistics/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching product statistics:', error);
        throw error;
    }
};

// 2. Thống kê đơn hàng
export const getOrderStatistics = async () => {
    try {
        const response = await apiPrivate.get('/statistics/orders');
        return response.data;
    } catch (error) {
        console.error('Error fetching order statistics:', error);
        throw error;
    }
};

// 3. Sản phẩm bán chạy (tất cả thời gian)
export const getTopProducts = async (limit = 10) => {
    try {
        const response = await apiPrivate.get('/statistics/top-products', {
            params: { limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching top products:', error);
        throw error;
    }
};

// 3b. Sản phẩm bán chạy theo khoảng thời gian
export const getTopProductsByDate = async (startDate, endDate, limit = 10) => {
    try {
        const response = await apiPrivate.get('/statistics/top-products/by-date', {
            params: { startDate, endDate, limit }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching top products by date:', error);
        throw error;
    }
};

// 4. Doanh thu theo ngày
export const getRevenueByDate = async (startDate, endDate) => {
    try {
        const response = await apiPrivate.get('/statistics/revenue/by-date', {
            params: { startDate, endDate }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching revenue by date:', error);
        throw error;
    }
};

// 5. Thống kê theo danh mục
export const getCategoryStatistics = async () => {
    try {
        const response = await apiPrivate.get('/statistics/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching category statistics:', error);
        throw error;
    }
};
