import { useContext } from 'react';
import styles from './Styles.module.scss';
import { SideBarContext } from '@/contexts/SideBarProvider';
import Button from '@components/Button/Button';
import PaymentMethods from '@components/PaymentMethods/PaymentMethods';

function RightBody({ handleExternalSubmit, paymentMethod, setPaymentMethod, isSubmitting }) {
  const { rightBody, title, items, item, total, subTotal, payment, btn } =
    styles;

  const { cartData } = useContext(SideBarContext);
  const baseUrlImg = "http://localhost:8081/images/";

  // Lấy data từ cartData
  const cartItems = cartData?.items || [];
  const totalAmount = cartData?.totalAmount || 0;

  return (
    <div className={rightBody}>
      <p className={title}> YOUR ORDER</p>

      <div className={items}>
        {cartItems.length > 0 ? (
          cartItems.map((product) => {
            const displayPrice = product.salePrice || product.price;
            return (
              <div className={item} key={product.id}>
                <img src={`${baseUrlImg}${product.imageUrl}`} alt={product.productName} />

                <div>
                  <p>{product.productName}</p>
                  <p>Giá: {displayPrice.toLocaleString()} đ</p>
                  {product.sizeName && <p>Size: {product.sizeName}</p>}
                  <p>Số lượng: {product.quantity}</p>
                  <p>Tạm tính: {product.subtotal.toLocaleString()} đ</p>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: 'center', padding: '20px' }}>Giỏ hàng trống</p>
        )}
      </div>

      <div className={subTotal}>
        <p>Tạm tính</p>
        <p>{totalAmount.toLocaleString()} đ</p>
      </div>

      <div className={total}>
        <p>TỔNG CỘNG</p>
        <p style={{ fontWeight: 'bold', color: '#e53935' }}>
          {totalAmount.toLocaleString()} đ
        </p>
      </div>

      <div style={{ marginTop: '20px', marginBottom: '10px' }}>
        <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>Phương thức thanh toán:</p>
        
        <div className={payment}>
          <input 
            type="radio" 
            id="cod" 
            name="payment_method" 
            value="Thanh toán khi nhận hàng"
            checked={paymentMethod === 'Thanh toán khi nhận hàng'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="cod" style={{ marginLeft: '8px' }}>Thanh toán khi nhận hàng (COD)</label>
        </div>

        <div className={payment} style={{ marginTop: '10px' }}>
          <input 
            type="radio" 
            id="qr" 
            name="payment_method" 
            value="Thanh toán qua QR Code"
            checked={paymentMethod === 'Thanh toán qua QR Code'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <label htmlFor="qr" style={{ marginLeft: '8px' }}>Thanh toán qua QR Code</label>
        </div>
      </div>

      <div className={btn}>
        <Button 
          content={isSubmitting ? 'Đang xử lý...' : 'ĐẶT HÀNG'} 
          onClick={handleExternalSubmit}
          disabled={isSubmitting || cartItems.length === 0}
        />
      </div>

      <PaymentMethods />
    </div>
  );
}

export default RightBody;
