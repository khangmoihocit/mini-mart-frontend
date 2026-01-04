import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import React, { useContext, useEffect } from 'react';
import { PiShoppingCart } from 'react-icons/pi';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { SideBarContext } from '@/contexts/SidebarProvider';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Footer from '@/components/Footer/Footer';

const Cart = () => {
    const {
        container,
        boxButton,
        boxTotal,
        productList,
        containerListProductCart,
        overLoading,
        isEmpty,
        boxEmpty,
        textEmpty,
        boxBtnEmpty,
        containerListItem
    } = styles;

    const navigate = useNavigate();

    const { listProductCart, isLoading, setIsOpen, handleGetListProducCart } = useContext(SideBarContext);
    
    // Calculate subtotal from cart items
    const subTotal = listProductCart.reduce((acc, item) => {
        return acc + (item.subtotal || 0);
    }, 0);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    };

    const handleNavigateToShop = () => {
        navigate('/shop');
        setIsOpen(false);
    };

    useEffect(() => {
        const userId = Cookies.get('userId');
        if (userId) {
            handleGetListProducCart(userId, 'cart');
        }
    }, []);

    return (
        <div className={classNames(container, {
            [isEmpty]: !listProductCart.length
        })}>
            <HeaderSideBar
                icon={<PiShoppingCart style={{ fontSize: '30px' }} />}
                title={'GIỎ HÀNG'}
            />
            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    Đang tải giỏ hàng...
                </div>
            ) : listProductCart.length ? (
                <div className={containerListItem}>
                    <div className={productList}>
                        <div className={containerListProductCart}>
                            {listProductCart.map((item, index) => {
                                return (
                                    <ItemProduct
                                        key={item.id || index}
                                        cartItemId={item.id}
                                        imageUrl={item.imageUrl}
                                        nameProduct={item.productName}
                                        priceProduct={item.salePrice || item.price}
                                        sizeProduct={item.sizeName}
                                        quantity={item.quantity}
                                        productId={item.productId}
                                        userId={Cookies.get('userId')}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className={boxTotal}>
                            <p>TỔNG TIỀN: </p>
                            <p>{formatCurrency(subTotal)}</p>
                        </div>
                        <div className={boxButton}>
                            <Button content={'XEM GIỎ HÀNG'} onClick={() => navigate('/cart')} />
                            <Button content={'THANH TOÁN'} isPrimary={false} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={boxEmpty}>
                    <div className={textEmpty}>Chưa có sản phẩm trong giỏ hàng</div>
                    <div className={boxBtnEmpty}>
                        <Button onClick={handleNavigateToShop} content={"TIẾP TỤC MUA SẮM"} />
                    </div>
                </div>
            )}
        </div>

    );
};

export default Cart;
