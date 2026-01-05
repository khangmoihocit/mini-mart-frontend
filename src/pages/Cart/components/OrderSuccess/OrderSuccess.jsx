import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { StepperContext } from '@/contexts/SteperProvider';
import orderService from '@/apis/orderService';
import Button from '@components/Button/Button';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';

function OrderSuccess() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setCurrentStep } = useContext(StepperContext);
  
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (orderId) {
      setIsLoading(true);
      orderService.getOrderById(orderId)
        .then((res) => {
          setOrderDetails(res.data.result);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error('Error loading order:', err);
          toast.error('Không thể tải thông tin đơn hàng');
          setIsLoading(false);
        });
    }
  }, [orderId]);

  const handleContinueShopping = () => {
    setCurrentStep(1);
    navigate('/shop');
  };

  const handleViewOrders = () => {
    navigate('/my-orders');
  };

  if (isLoading) {
    return (
      <div className={styles.orderSuccess}>
        <div className={styles.loading}>Đang tải thông tin đơn hàng...</div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className={styles.orderSuccess}>
        <div className={styles.error}>Không tìm thấy thông tin đơn hàng</div>
      </div>
    );
  }

  return (
    <div className={styles.orderSuccess}>
      <div className={styles.successIcon}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="#4CAF50" />
          <path d="M25 40L35 50L55 30" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h2 className={styles.title}>Đặt hàng thành công!</h2>
      <p className={styles.subtitle}>Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn sớm nhất.</p>

      <div className={styles.orderInfo}>
        <h3>Thông tin đơn hàng</h3>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Mã đơn hàng:</span>
          <span className={styles.value}>{orderDetails.id}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Ngày đặt:</span>
          <span className={styles.value}>
            {new Date(orderDetails.orderDate).toLocaleString('vi-VN')}
          </span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Người nhận:</span>
          <span className={styles.value}>{orderDetails.fullName}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Số điện thoại:</span>
          <span className={styles.value}>{orderDetails.phoneNumber}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{orderDetails.email}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Địa chỉ giao hàng:</span>
          <span className={styles.value}>{orderDetails.shippingAddress}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Phương thức thanh toán:</span>
          <span className={styles.value}>{orderDetails.paymentMethod}</span>
        </div>
        
        <div className={styles.infoRow}>
          <span className={styles.label}>Trạng thái:</span>
          <span className={`${styles.value} ${styles.status}`}>
            {orderDetails.status === 'PENDING' ? 'Chờ xử lý' : orderDetails.status}
          </span>
        </div>

        {orderDetails.note && (
          <div className={styles.infoRow}>
            <span className={styles.label}>Ghi chú:</span>
            <span className={styles.value}>{orderDetails.note}</span>
          </div>
        )}
      </div>

      <div className={styles.products}>
        <h3>Sản phẩm đã đặt</h3>
        {orderDetails.orderDetails?.map((item) => (
          <div key={item.id} className={styles.productItem}>
            <img src={`http://localhost:8081/images/${item.productImage}`} alt={item.productName} />
            <div className={styles.productInfo}>
              <p className={styles.productName}>{item.productName}</p>
              {item.productSize && <p className={styles.productSize}>Size: {item.productSize}</p>}
              <p className={styles.productPrice}>
                {item.price.toLocaleString()} đ x {item.numberOfProducts}
              </p>
            </div>
            <div className={styles.productTotal}>
              {item.totalMoney.toLocaleString()} đ
            </div>
          </div>
        ))}
      </div>

      <div className={styles.totalAmount}>
        <span>Tổng cộng:</span>
        <span className={styles.amount}>{orderDetails.totalMoney.toLocaleString()} đ</span>
      </div>

      <div className={styles.actions}>
        <Button content="Xem đơn hàng của tôi" onClick={handleViewOrders} />
        <Button content="Tiếp tục mua sắm" isPriamry={false} onClick={handleContinueShopping} />
      </div>
    </div>
  );
}

export default OrderSuccess;
