import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import React, { useContext, useEffect } from 'react';
import { PiShoppingCart } from 'react-icons/pi';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { SideBarContext } from '@/contexts/SidebarProvider';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

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

    const { listProductCart, isLoading, setIsOpen } = useContext(SideBarContext);
    
    const subTotal = listProductCart.reduce((acc, item)=>{
        return acc + item.total;
    }, 0);

    const handleNavigateToShop = ()=>{
        navigate('/shop');
        setIsOpen(false);
    }

    return (
        <div className={classNames(container, {
            [isEmpty]: !listProductCart.length
        })}>
            <HeaderSideBar
                icon={<PiShoppingCart style={{ fontSize: '30px' }} />}
                title={'CART'}
            />
            {listProductCart.length ? (
                <div className={containerListItem}>
                    <div className={productList}>
                        <div className={containerListProductCart}>
                            {listProductCart.map((item, index) => {
                                return (
                                    <ItemProduct
                                        src={item.images[0]}
                                        nameProduct={item.name}
                                        priceProduct={item.price}
                                        skuProduct={item.sku}
                                        sizeProduct={item.size}
                                        quantity={item.quantity}
                                        key={index}
                                        productId={item.productId}
                                        userId={item.userId}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className={boxTotal}>
                            <p>SUBTOTAL: </p>
                            <p>${subTotal}</p>
                        </div>
                        <div className={boxButton}>
                            <Button content={'VIEW CART'} />
                            <Button content={'CHECKOUT'} isPrimary={false} />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={boxEmpty}>
                    <div className={textEmpty}>No products in the cart</div>
                    <div className={boxBtnEmpty}>
                        <Button onClick={handleNavigateToShop} content={"RETURN TO SHOP"}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
