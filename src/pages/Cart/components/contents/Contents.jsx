import CartTable from '@/pages/Cart/components/contents/CartTable';
import styles from '../../styles.module.scss';
import CartSummary from '@/pages/Cart/components/contents/CartSummary';
import Button from '@components/Button/Button';
import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { PiShoppingCartLight } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import cartService from '@/apis/cartService';
import Cookies from 'js-cookie';

function Contents() {
    const {
        containerContents,
        boxFooter,
        boxBtnDelete,
        boxCoupon,
        boxEmptyCart,
        titleEmpty,
        boxBtnEmpty
    } = styles;
    const {
        cartData,
        setCartData,
        isLoading,
        setIsLoading
    } = useContext(SideBarContext);
    const navigate = useNavigate();
    const userId = Cookies.get('userId');

    const fetchCart = () => {
        if (!userId) return;
        setIsLoading(true);
        cartService.getCart()
            .then((res) => {
                // API trả về: { code, message, result: { items: [], totalAmount, ... } }
                setCartData(res.data.result || { items: [], totalAmount: 0, totalItems: 0 });
                setIsLoading(false);
            })
            .catch((err) => {
                setCartData({ items: [], totalAmount: 0, totalItems: 0 });
                setIsLoading(false);
                console.log(err);
            });
    };

    const handleReplaceQuantity = (cartItemId, quantity) => {
        setIsLoading(true);
        cartService.updateCartItem(cartItemId, { quantity })
            .then((res) => {
                // API trả về cart đầy đủ sau khi update
                setCartData(res.data.result || { items: [], totalAmount: 0, totalItems: 0 });
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    };

    const handleDeleteItemCart = (cartItemId) => {
        setIsLoading(true);
        cartService.removeFromCart(cartItemId)
            .then((res) => {
                // API trả về cart đầy đủ sau khi xóa
                setCartData(res.data.result || { items: [], totalAmount: 0, totalItems: 0 });
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    };

    const handleDeleteCart = () => {
        setIsLoading(true);
        cartService.clearCart()
            .then((res) => {
                setCartData({ items: [], totalAmount: 0, totalItems: 0 });
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            });
    };

    const handleNavigateToShop = () => {
        navigate('/shop');
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <>
            {cartData?.items?.length > 0 && userId ? (
                <div className={containerContents}>
                    <div
                        style={{
                            width: '58%'
                        }}
                    >
                        <CartTable
                            cartData={cartData}
                            getData={handleReplaceQuantity}
                            isLoading={isLoading}
                            getDataDelete={handleDeleteItemCart}
                        />

                        <div className={boxFooter}>
                            <div className={boxCoupon}>
                                <input type='text' placeholder='Mã giảm giá' />
                                <Button content={'OK'} isPriamry={false} />
                            </div>

                            <div className={boxBtnDelete}>
                                <Button
                                    content={
                                        <div>&#128465; XÓA GIỎ HÀNG</div>
                                    }
                                    isPriamry={false}
                                    onClick={handleDeleteCart}
                                />
                            </div>
                        </div>
                    </div>

                    <CartSummary />
                </div>
            ) : (
                <div className={boxEmptyCart}>
                    <PiShoppingCartLight
                        style={{
                            fontSize: '50px'
                        }}
                    />
                    <div className={titleEmpty}>
                        GIỎ HÀNG CỦA BẠN TRỐNG
                    </div>
                    <div>
                        Chúng tôi mời bạn làm quen với các mặt hàng trong cửa hàng của chúng tôi. Chắc chắn bạn có thể tìm thấy thứ gì đó cho riêng mình!
                    </div>
                    <div className={boxBtnEmpty}>
                        <Button
                            content={'QUAY LẠI CỬA HÀNG'}
                            onClick={handleNavigateToShop}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Contents;
