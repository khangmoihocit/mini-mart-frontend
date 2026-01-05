import { createOrder } from '@/apis/orderService';
import userService from '@/apis/userService';
import RightBody from '@/pages/Cart/components/Checkout/RightBody';
import InputCustom from '@components/InputCommon/InputCustom';
import axios from 'axios';
import cls from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { StepperContext } from '@/contexts/SteperProvider';
import { toast } from 'react-toastify';

const CN_BASE = 'https://countriesnow.space/api/v0.1';

function Checkout() {
  const { container, title, coupon, leftBody, rightBody, row, row2Column } =
    styles;

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Thanh toán khi nhận hàng');
  const [shippingMethod] = useState('Giao hàng tiêu chuẩn');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { cartData, setCartData } = useContext(SideBarContext);
  const { setCurrentStep } = useContext(StepperContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const formRef = useRef();

  const handleExternalSubmit = () => {
    formRef.current.requestSubmit();
  };

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    
    // Kiểm tra giỏ hàng có sản phẩm không
    if (!cartData?.items || cartData.items.length === 0) {
      toast.error('Giỏ hàng của bạn trống!');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        fullName: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        phoneNumber: data.phone,
        shippingAddress: [
          data.street,
          data.state,
          data.cities,
          'Việt Nam'
        ].filter(Boolean).join(', '),
        note: data.note || '',
        shippingMethod: shippingMethod,
        paymentMethod: paymentMethod
      };

      const res = await createOrder(orderData);
      
      const orderResult = res.data.result;
      
      setCartData({ items: [], totalAmount: 0, totalItems: 0, totalQuantity: 0 });
      
      toast.success('Đặt hàng thành công!');
      
      setCurrentStep(3);
      navigate(`/cart?step=3&orderId=${orderResult.id}`, { replace: true });
    } catch (error) {
      console.error('Error creating order:', error);
      const errorMessage = error.response?.data?.message || 'Đặt hàng thất bại. Vui lòng thử lại!';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await userService.getMyInfo();
        if (response.data.code === 0) {
          const user = response.data.result;
          
          // Tách họ và tên
          if (user.fullName) {
            const nameParts = user.fullName.trim().split(' ');
            if (nameParts.length >= 2) {
              setValue('firstName', nameParts[0]);
              setValue('lastName', nameParts.slice(1).join(' '));
            } else {
              setValue('firstName', user.fullName);
            }
          }
          
          // Điền email và số điện thoại
          if (user.email) setValue('email', user.email);
          if (user.phoneNumber) setValue('phone', user.phoneNumber);
          
          // Điền địa chỉ nếu có
          if (user.address) {
            setValue('street', user.address);
          }
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [setValue]);

  // Load 
  // Load danh sách tỉnh/thành phố Việt Nam
  useEffect(() => {
    window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    if (!localStorage.getItem('listCities')) {
      axios.get('https://provinces.open-api.vn/api/?depth=2').then((res) => {
        localStorage.setItem('listCities', JSON.stringify(res.data));
        setCities(
          res.data.map((item) => ({
            label: item.name,
            value: item.codename,
          }))
        );
      });
    } else {
      const data = JSON.parse(localStorage.getItem('listCities'));
      setCities(
        data.map((item) => ({
          label: item.name,
          value: item.codename,
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (!watch('cities')) return;

    if (localStorage.getItem('listCities')) {
      const data = JSON.parse(localStorage.getItem('listCities'));
      const statesCustom = data
        .find((item) => item.codename === watch('cities'))
        .districts.map((item) => ({
          label: item.name,
          value: item.codename,
        }));

      setStates(statesCustom);
    }
  }, [watch('cities')]);

  return (
    <div className={container}>
      <div className={leftBody}>
        <p className={title}>THÔNG TIN GIẢO HÀNG</p>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <div className={cls(row, row2Column)}>
            <InputCustom
              label={'Họ'}
              type={'text'}
              isRequired
              register={register('firstName', {
                required: true,
                maxLength: 25,
              })}
              isError={errors.firstName}
            />
            <InputCustom
                label={'Ghi chú (đặt hàng)'}
              type={'text'}
              register={register('note')}
            />
          </div>
          <div className={cls(row, row2Column)}>
            <InputCustom
              label={'Số điện thoại'}
              type={'text'}
              isRequired
              register={register('phone', {
                required: true,
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
              })}
              isError={errors.phone}
            />
            <InputCustom
              label={'Email'}
              type={'email'}
              isRequired
              register={register('email', {
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              isError={errors.email}
            />
          </div>

          <div className={row}>
            <InputCustom
              label='Địa chỉ chi tiết (Số nhà, tên đường)'
              type={'text'}
              isRequired
              register={register('street', {
                required: true,
              })}
              isError={errors.street}
            />
          </div>

          <div className={cls(row, row2Column)}>
            <InputCustom
              label={'Tỉnh / Thành phố'}
              dataOptions={cities}
              isRequired
              register={register('cities', {
                required: true,
              })}
              isError={errors.cities}
            />
            <InputCustom
              label={'Quận / Huyện'}
              dataOptions={states}
              isRequired
              register={register('state', {
                required: true,
              })}
              isError={errors.state}
            />
          </div>

          <div className={row}>
            
          </div>

          {/* <button type="submit">Submit</button> */}
        </form>
      </div>

      <RightBody 
        handleExternalSubmit={handleExternalSubmit} 
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default Checkout;
