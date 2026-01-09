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
        setIsLoading,
        handleGetListProducCart,
        updateCartCount
    } = useContext(SideBarContext);
    const navigate = useNavigate();
    const userId = Cookies.get('userId');

    const fetchCart = async () => {
        if (!userId) return;
        await handleGetListProducCart(userId, 'cart');
        await updateCartCount();
    };

    const handleReplaceQuantity = async (cartItemId, quantity) => {
        setIsLoading(true);
        try {
            await cartService.updateCartItem(cartItemId, { quantity });
            // Đồng bộ giỏ hàng sau khi cập nhật
            await handleGetListProducCart(userId, 'cart');
            await updateCartCount();
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteItemCart = async (cartItemId) => {
        setIsLoading(true);
        try {
            await cartService.removeFromCart(cartItemId);
            // Đồng bộ giỏ hàng sau khi xóa
            await handleGetListProducCart(userId, 'cart');
            await updateCartCount();
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCart = async () => {
        setIsLoading(true);
        try {
            await cartService.clearCart();
            // Đồng bộ giỏ hàng sau khi xóa toàn bộ
            await handleGetListProducCart(userId, 'cart');
            await updateCartCount();
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
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
