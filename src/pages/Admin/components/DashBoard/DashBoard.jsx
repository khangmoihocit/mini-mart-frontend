import React, { useEffect, useState } from 'react';
import {
    getProductStatistics,
    getOrderStatistics,
    getTopProducts,
    getRevenueByDate,
    getCategoryStatistics
} from '@/apis/statisticsService';
import { 
    IoReload, 
    IoStatsChartOutline, 
    IoCloseCircleOutline, 
    IoWarningOutline, 
    IoCashOutline, 
    IoTrendingUpOutline,
    IoClipboardOutline,
    IoHourglassOutline,
    IoSettingsOutline,
    IoCarOutline,
    IoCheckmarkCircleOutline,
    IoTimeOutline,
    IoTrophyOutline,
    IoFolderOpenOutline
} from 'react-icons/io5';
import { MdInventory2 } from 'react-icons/md';
import styles from './styles.module.scss';

const DashBoard = () => {
    const [productStats, setProductStats] = useState(null);
    const [orderStats, setOrderStats] = useState(null);
    const [topProducts, setTopProducts] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [categoryStats, setCategoryStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllStatistics();
    }, []);

    const fetchAllStatistics = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Lấy ngày hiện tại và 7 ngày trước để hiển thị doanh thu
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7);
            
            const formatDate = (date) => {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`;
            };

            // Gọi tất cả API song song
            const [
                productRes,
                orderRes,
                topProductsRes,
                revenueRes,
                categoryRes
            ] = await Promise.all([
                getProductStatistics(),
                getOrderStatistics(),
                getTopProducts(5),
                getRevenueByDate(formatDate(startDate), formatDate(endDate)),
                getCategoryStatistics()
            ]);

            setProductStats(productRes.result);
            setOrderStats(orderRes.result);
            setTopProducts(topProductsRes.result);
            setRevenueData(revenueRes.result);
            setCategoryStats(categoryRes.result);
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
            console.error('Error fetching statistics:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    };

    const formatNumber = (value) => {
        return new Intl.NumberFormat('vi-VN').format(value);
    };

    if (loading) {
        return (
            <div className={styles.dashboard}>
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Đang tải dữ liệu thống kê...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.dashboard}>
                <div className={styles.error}>
                    <h3>Lỗi</h3>
                    <p>{error}</p>
                    <button onClick={fetchAllStatistics} className={styles.retryBtn}>
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1>Dashboard Thống Kê</h1>
                <button onClick={fetchAllStatistics} className={styles.refreshBtn}>
                    <IoReload /> Làm mới
                </button>
            </div>

            {/* Thống kê sản phẩm */}
            {productStats && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}><MdInventory2 /> Thống Kê Sản Phẩm</h2>
                    <div className={styles.statsGrid}>
                        <div className={`${styles.statCard} ${styles.primary}`}>
                            <div className={styles.statIcon}><IoStatsChartOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Tổng sản phẩm</p>
                                <p className={styles.statValue}>{formatNumber(productStats.totalProducts)}</p>
                            </div>
                        </div>
                        <div className={`${styles.statCard} ${styles.danger}`}>
                            <div className={styles.statIcon}><IoCloseCircleOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Hết hàng</p>
                                <p className={styles.statValue}>{formatNumber(productStats.outOfStockProducts)}</p>
                            </div>
                        </div>
                        <div className={`${styles.statCard} ${styles.warning}`}>
                            <div className={styles.statIcon}><IoWarningOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Sắp hết hàng</p>
                                <p className={styles.statValue}>{formatNumber(productStats.lowStockProducts)}</p>
                            </div>
                        </div>
                        <div className={`${styles.statCard} ${styles.success}`}>
                            <div className={styles.statIcon}><IoCashOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Giá trị tồn kho</p>
                                <p className={styles.statValue}>{formatCurrency(productStats.totalInventoryValue)}</p>
                            </div>
                        </div>
                        <div className={`${styles.statCard} ${styles.info}`}>
                            <div className={styles.statIcon}><IoTrendingUpOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Giá trung bình</p>
                                <p className={styles.statValue}>{formatCurrency(productStats.averagePrice)}</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Thống kê đơn hàng */}
            {orderStats && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}><IoClipboardOutline /> Thống Kê Đơn Hàng</h2>
                    <div className={styles.statsGrid}>
                        <div className={`${styles.statCard} ${styles.primary}`}>
                            <div className={styles.statIcon}><MdInventory2 /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Tổng đơn hàng</p>
                                <p className={styles.statValue}>{formatNumber(orderStats.totalOrders)}</p>
                            </div>
                        </div>
                        <div className={`${styles.statCard} ${styles.warning}`}>
                            <div className={styles.statIcon}><IoHourglassOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Chờ xử lý</p>
                                <p className={styles.statValue}>{formatNumber(orderStats.pendingOrders)}</p>
                            </div>
                        </div>
                        <div className={`${styles.statCard} ${styles.info}`}>
                            <div className={styles.statIcon}><IoSettingsOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Đang xử lý</p>
                                <p className={styles.statValue}>{formatNumber(orderStats.processingOrders)}</p>
                            </div>
                        </div>
                        <div className={`${styles.statCard} ${styles.info}`}>
                            <div className={styles.statIcon}><IoCarOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Đang giao</p>
                                <p className={styles.statValue}>{formatNumber(orderStats.shippedOrders)}</p>
                            </div>
                        </div>
                        <div className={`${styles.statCard} ${styles.success}`}>
                            <div className={styles.statIcon}><IoCheckmarkCircleOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Đã giao</p>
                                <p className={styles.statValue}>{formatNumber(orderStats.deliveredOrders)}</p>
                            </div>
                        </div>
                        <div className={`${styles.statCard} ${styles.danger}`}>
                            <div className={styles.statIcon}><IoCloseCircleOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Đã hủy</p>
                                <p className={styles.statValue}>{formatNumber(orderStats.cancelledOrders)}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.revenueGrid}>
                        <div className={`${styles.statCard} ${styles.success} ${styles.large}`}>
                            <div className={styles.statIcon}><IoCashOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Tổng doanh thu</p>
                                <p className={styles.statValue}>{formatCurrency(orderStats.totalRevenue)}</p>
                            </div>
                        </div>
                        <div className={`${styles.statCard} ${styles.warning} ${styles.large}`}>
                            <div className={styles.statIcon}><IoTimeOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Doanh thu đang chờ</p>
                                <p className={styles.statValue}>{formatCurrency(orderStats.pendingRevenue)}</p>
                            </div>
                        </div>
                        <div className={`${styles.statCard} ${styles.info} ${styles.large}`}>
                            <div className={styles.statIcon}><IoStatsChartOutline /></div>
                            <div className={styles.statInfo}>
                                <p className={styles.statLabel}>Giá trị TB đơn hàng</p>
                                <p className={styles.statValue}>{formatCurrency(orderStats.averageOrderValue)}</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Sản phẩm bán chạy */}
            {topProducts && topProducts.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}><IoTrophyOutline /> Top 5 Sản Phẩm Bán Chạy</h2>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Đã bán</th>
                                    <th>Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topProducts.map((product, index) => (
                                    <tr key={product.productId}>
                                        <td>
                                            <span className={styles.rank}>
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td className={styles.productName}>{product.productName}</td>
                                        <td>{formatNumber(product.totalSold)}</td>
                                        <td className={styles.revenue}>{formatCurrency(product.totalRevenue)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {/* Doanh thu 7 ngày gần nhất */}
            {revenueData && revenueData.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}><IoTrendingUpOutline /> Doanh Thu 7 Ngày Gần Nhất</h2>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Ngày</th>
                                    <th>Số đơn hàng</th>
                                    <th>Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {revenueData.map((day) => (
                                    <tr key={day.date}>
                                        <td>{new Date(day.date).toLocaleDateString('vi-VN')}</td>
                                        <td>{formatNumber(day.orderCount)}</td>
                                        <td className={styles.revenue}>{formatCurrency(day.totalRevenue)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className={styles.totalRow}>
                                    <td><strong>Tổng</strong></td>
                                    <td><strong>{formatNumber(revenueData.reduce((sum, day) => sum + day.orderCount, 0))}</strong></td>
                                    <td className={styles.revenue}>
                                        <strong>{formatCurrency(revenueData.reduce((sum, day) => sum + day.totalRevenue, 0))}</strong>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </section>
            )}

            {/* Thống kê theo danh mục */}
            {categoryStats && categoryStats.length > 0 && (
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}><IoFolderOpenOutline /> Thống Kê Theo Danh Mục</h2>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Danh mục</th>
                                    <th>Số sản phẩm</th>
                                    <th>Đã bán</th>
                                    <th>Doanh thu</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryStats.map((category) => (
                                    <tr key={category.categoryId}>
                                        <td className={styles.categoryName}>{category.categoryName}</td>
                                        <td>{formatNumber(category.productCount)}</td>
                                        <td>{formatNumber(category.totalSold)}</td>
                                        <td className={styles.revenue}>{formatCurrency(category.totalRevenue)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className={styles.totalRow}>
                                    <td><strong>Tổng</strong></td>
                                    <td><strong>{formatNumber(categoryStats.reduce((sum, cat) => sum + cat.productCount, 0))}</strong></td>
                                    <td><strong>{formatNumber(categoryStats.reduce((sum, cat) => sum + cat.totalSold, 0))}</strong></td>
                                    <td className={styles.revenue}>
                                        <strong>{formatCurrency(categoryStats.reduce((sum, cat) => sum + cat.totalRevenue, 0))}</strong>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
};

export default DashBoard;