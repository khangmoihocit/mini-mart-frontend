import React from 'react';
import styles from '../../styles.module.scss';
import Button from '@components/Button/Button';
import cls from 'classnames';
import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import LoadingCart from '@/pages/Cart/components/Loading';
import PaymentMethods from '@components/PaymentMethods/PaymentMethods';
import { StepperContext } from '@/contexts/SteperProvider';

const CartSummary = () => {
  const {
    containerSummary,
    title,
    boxTotal,
    price,
    subTotal,
    totals,
    space,
    containerRight,
  } = styles;
  const { cartData, isLoading } = useContext(SideBarContext);
  const { setCurrentStep } = useContext(StepperContext);

  const handleProcessCheckout = () => {
    setCurrentStep(2);
  };

  // Lấy totalAmount từ API response
  const totalAmount = cartData?.totalAmount || 0;

  return (
    <div className={containerRight}>
      <div className={containerSummary}>
        <div className={title}>TỔNG GIỎ HÀNG</div>

        <div className={cls(boxTotal, subTotal)}>
          <div>Tạm tính</div>
          <div className={price}>
            {totalAmount.toLocaleString()} đ
          </div>
        </div>

        <div className={cls(boxTotal, totals)}>
          <div>TỔNG CỘNG</div>
          <div>{totalAmount.toLocaleString()} đ</div>
        </div>

        <Button
          content={'TIẾN HÀNH THANH TOÁN'}
          onClick={handleProcessCheckout}
        />
        <div className={space} />
        <Button content={'TIẾP TỤC MUA SẮM'} onClick={() => window.location.href = '/shop'} isPrimary={false} />
        {isLoading && <LoadingCart />}
      </div>

      <PaymentMethods />
    </div>
  );
};

export default CartSummary;
