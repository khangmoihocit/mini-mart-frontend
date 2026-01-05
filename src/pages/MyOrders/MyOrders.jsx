import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '@/apis/orderService';
import MyHeader from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';
import MainLayout from '@components/Layout/Layout';
import Button from '@components/Button/Button';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
  });
  
  const navigate = useNavigate();

  const fetchOrders = (page = 1) => {
    setIsLoading(true);
    orderService.getMyOrders(page, 10)
      .then((res) => {
        const result = res.data.result;
        setOrders(result.content || []);
        setPagination({
          pageNo: result.pageNo,
          pageSize: result.pageSize,
          totalElements: result.totalElements,
          totalPages: result.totalPages,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading orders:', err);
        toast.error('Không thể tải danh sách đơn hàng');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
    window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
  }, []);

  const handleViewDetail = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      orderService.cancelOrder(orderId)
        .then(() => {
          toast.success('Hủy đơn hàng thành công!');
          fetchOrders(pagination.pageNo); // Reload current page
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message || 'Không thể hủy đơn hàng';
          toast.error(errorMessage);
        });
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      PENDING: 'Chờ xử lý',
      PROCESSING: 'Đang xử lý',
      SHIPPING: 'Đang giao hàng',
      DELIVERED: 'Đã giao hàng',
      CANCELLED: 'Đã hủy',
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const classMap = {
      PENDING: styles.statusPending,
      PROCESSING: styles.statusProcessing,
      SHIPPING: styles.statusShipping,
      DELIVERED: styles.statusDelivered,
      CANCELLED: styles.statusCancelled,
    };
    return classMap[status] || '';
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchOrders(newPage);
    }
  };

  return (
    <>
      <MyHeader />
      <MainLayout>
        <div className={styles.myOrders}>
          <h1 className={styles.title}>Đơn hàng của tôi</h1>

          {isLoading ? (
            <div className={styles.loading}>Đang tải...</div>
          ) : orders.length === 0 ? (
            <div className={styles.empty}>
              <p>Bạn chưa có đơn hàng nào</p>
              <Button content="Mua sắm ngay" onClick={() => navigate('/shop')} />
            </div>
          ) : (
            <>
              <div className={styles.ordersList}>
                {orders.map((order) => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div className={styles.orderInfo}>
                        <span className={styles.orderId}>Mã đơn: {order.id}</span>
                        <span className={styles.orderDate}>
                          {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <span className={`${styles.status} ${getStatusClass(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    <div className={styles.orderBody}>
                      <div className={styles.customerInfo}>
                        <p><strong>Người nhận:</strong> {order.fullName}</p>
                        <p><strong>SĐT:</strong> {order.phoneNumber}</p>
                        <p><strong>Địa chỉ:</strong> {order.shippingAddress}</p>
                      </div>

                      <div className={styles.orderProducts}>
                        {order.orderDetails?.slice(0, 2).map((item) => (
                          <div key={item.id} className={styles.productItem}>
                            <img 
                              src={`http://localhost:8081/images/${item.productImage}`} 
                              alt={item.productName} 
                            />
                            <div className={styles.productInfo}>
                              <p className={styles.productName}>{item.productName}</p>
                              {item.productSize && <p className={styles.productSize}>Size: {item.productSize}</p>}
                              <p className={styles.productQuantity}>x{item.numberOfProducts}</p>
                            </div>
                            <div className={styles.productPrice}>
                              {item.totalMoney.toLocaleString()} đ
                            </div>
                          </div>
                        ))}
                        {order.orderDetails?.length > 2 && (
                          <p className={styles.moreProducts}>
                            +{order.orderDetails.length - 2} sản phẩm khác
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={styles.orderFooter}>
                      <div className={styles.totalAmount}>
                        <span>Tổng tiền:</span>
                        <span className={styles.amount}>{order.totalMoney.toLocaleString()} đ</span>
                      </div>
                      <div className={styles.actions}>
                        <Button 
                          content="Xem chi tiết" 
                          onClick={() => handleViewDetail(order.id)}
                        />
                        {order.status === 'PENDING' && (
                          <Button 
                            content="Hủy đơn" 
                            isPriamry={false}
                            onClick={() => handleCancelOrder(order.id)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    onClick={() => handlePageChange(pagination.pageNo - 1)}
                    disabled={pagination.pageNo === 1}
                    className={styles.pageBtn}
                  >
                    Trước
                  </button>
                  
                  <div className={styles.pageNumbers}>
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`${styles.pageBtn} ${page === pagination.pageNo ? styles.active : ''}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.pageNo + 1)}
                    disabled={pagination.pageNo === pagination.totalPages}
                    className={styles.pageBtn}
                  >
                    Sau
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </MainLayout>
      <MyFooter />
    </>
  );
}

export default MyOrders;
