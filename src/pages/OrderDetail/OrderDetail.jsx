import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import orderService from '@/apis/orderService';
import MyHeader from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';
import MainLayout from '@components/Layout/Layout';
import Button from '@components/Button/Button';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';

function OrderDetail() {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const fetchOrderDetail = () => {
    setIsLoading(true);
    orderService.getOrderById(orderId)
      .then((res) => {
        setOrder(res.data.result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading order:', err);
        toast.error('Không thể tải thông tin đơn hàng');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetail();
    }
    window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
  }, [orderId]);

  const handleCancelOrder = () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      orderService.cancelOrder(orderId)
        .then(() => {
          toast.success('Hủy đơn hàng thành công!');
          fetchOrderDetail(); // Reload order
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

  if (isLoading) {
    return (
      <>
        <MyHeader />
        <MainLayout>
          <div className={styles.loading}>Đang tải thông tin đơn hàng...</div>
        </MainLayout>
        <MyFooter />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <MyHeader />
        <MainLayout>
          <div className={styles.error}>
            <p>Không tìm thấy thông tin đơn hàng</p>
            <Button content="Quay lại" onClick={() => navigate('/my-orders')} />
          </div>
        </MainLayout>
        <MyFooter />
      </>
    );
  }

  return (
    <>
      <MyHeader />
      <MainLayout>
        <div className={styles.orderDetail}>
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Chi tiết đơn hàng</h1>
              <p className={styles.orderId}>Mã đơn: {order.id}</p>
            </div>
            <span className={`${styles.status} ${getStatusClass(order.status)}`}>
              {getStatusText(order.status)}
            </span>
          </div>

          <div className={styles.orderInfo}>
            <div className={styles.section}>
              <h3>Thông tin đơn hàng</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Ngày đặt:</span>
                  <span className={styles.value}>
                    {new Date(order.orderDate).toLocaleString('vi-VN')}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Phương thức thanh toán:</span>
                  <span className={styles.value}>{order.paymentMethod}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Phương thức vận chuyển:</span>
                  <span className={styles.value}>{order.shippingMethod}</span>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h3>Thông tin người nhận</h3>
              <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Họ tên:</span>
                  <span className={styles.value}>{order.fullName}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Số điện thoại:</span>
                  <span className={styles.value}>{order.phoneNumber}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Email:</span>
                  <span className={styles.value}>{order.email}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.label}>Địa chỉ giao hàng:</span>
                  <span className={styles.value}>{order.shippingAddress}</span>
                </div>
                {order.note && (
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Ghi chú:</span>
                    <span className={styles.value}>{order.note}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className={styles.products}>
            <h3>Sản phẩm đã đặt</h3>
            <div className={styles.productsList}>
              {order.orderDetails?.map((item) => (
                <div key={item.id} className={styles.productItem}>
                  <img 
                    src={`http://localhost:8081/images/${item.productImage}`} 
                    alt={item.productName} 
                  />
                  <div className={styles.productInfo}>
                    <p className={styles.productName}>{item.productName}</p>
                    {item.productSize && (
                      <p className={styles.productSize}>Size: {item.productSize}</p>
                    )}
                    <p className={styles.productPrice}>
                      {item.price.toLocaleString()} đ
                    </p>
                  </div>
                  <div className={styles.quantity}>
                    <span>Số lượng: {item.numberOfProducts}</span>
                  </div>
                  <div className={styles.total}>
                    {item.totalMoney.toLocaleString()} đ
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.orderSummary}>
              <div className={styles.summaryRow}>
                <span>Tổng tiền hàng:</span>
                <span>{order.totalMoney.toLocaleString()} đ</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Tổng thanh toán:</span>
                <span className={styles.totalAmount}>
                  {order.totalMoney.toLocaleString()} đ
                </span>
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button 
              content="Quay lại danh sách" 
              isPriamry={false}
              onClick={() => navigate('/my-orders')} 
            />
            {order.status === 'PENDING' && (
              <Button 
                content="Hủy đơn hàng" 
                onClick={handleCancelOrder}
              />
            )}
          </div>
        </div>
      </MainLayout>
      <MyFooter />
    </>
  );
}

export default OrderDetail;
