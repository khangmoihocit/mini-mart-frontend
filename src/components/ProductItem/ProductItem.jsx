import React, { useContext, useState } from 'react';
import styles from './styles.module.scss';
import heartIcon from '@icons/svgs/heartIcon.svg';
import reloadIcon from '@icons/svgs/reloadIcon.svg';
import cartIcon from '@icons/svgs/cartIcon.svg';
import classNames from 'classnames';
import Button from '@components/Button/Button';
import Cookies from 'js-cookie';
import { SideBarContext } from '@/contexts/SidebarProvider';
import { ToastContext } from '@/contexts/ToastProvider';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

const ProductItem = ({
    src,
    preSrc,
    name,
    price,
    details,
    isHomePage = true,
    isShowGrid = true
}) => {
    const {
        container,
        boxImg,
        showImgWhenHover,
        showFuncWhenHover,
        boxIcon,
        innerTitle,
        innerPrice,
        boxSize,
        size,
        textCenter,
        boxBtn,
        boxContent,
        leftBtn,
        largImg,
        isActiveSize,
        btnClear
    } = styles;

    const [sizeChoose, setSizeChoose] = useState('');
    const userId = Cookies.get('userId');
    const [isLoading, setIsLoading] = useState(false);
    const { setIsOpen, setType, handleGetListProducCart } = useContext(SideBarContext);
    const { toast } = useContext(ToastContext);

    const handleChooseSize = size => {
        setSizeChoose(size);
    };

    const handleClearSize = () => {
        setSizeChoose('');
    };

    const handleAddToCart = () => {
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Please login to add product to cart');
            return;
        }

        if (!sizeChoose) {
            toast.warning('Please choose size!');
            return;
        }

        const data = {
            userId,
            productId: details._id,
            quantity: 1,
            size: sizeChoose
        };

        setIsLoading(true);
        addProductToCart(data)
            .then(response => {
                toast.success(response.data.msg);
                setIsOpen(true);
                setType('cart');
                handleGetListProducCart(userId, 'cart');
                setIsLoading(false);
            })
            .catch(error => {
                toast.error('Add product to cart fail');
                setIsLoading(false);
            });
    };

    return (
        <div
            className={isShowGrid ? '' : container}
            style={{ marginTop: '20px' }}
        >
            <div className={classNames(boxImg, { [largImg]: !isShowGrid })}>
                <img src={src} alt='' />
                <img src={preSrc} alt='' className={showImgWhenHover} />
                <div className={showFuncWhenHover}>
                    <div className={boxIcon}>
                        <img src={cartIcon} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={heartIcon} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={reloadIcon} alt='' />
                    </div>
                    <div className={boxIcon}>
                        <img src={cartIcon} alt='' />
                    </div>
                </div>
            </div>
            <div className={isShowGrid ? '' : boxContent}>
                {!isHomePage && (
                    <div className={boxSize}>
                        {details.size.map((item, index) => {
                            return (
                                <div
                                    className={classNames(size, {
                                        [isActiveSize]: item.name === sizeChoose
                                    })}
                                    key={index}
                                    onClick={() => handleChooseSize(item.name)}
                                >
                                    {item.name}
                                </div>
                            );
                        })}
                    </div>
                )}

                {sizeChoose && (
                    <div className={btnClear} onClick={handleClearSize}>
                        Clear
                    </div>
                )}

                <div
                    className={classNames(innerTitle, {
                        [textCenter]: !isHomePage
                    })}
                >
                    {name}
                </div>
                {!isHomePage && (
                    <div
                        className={textCenter}
                        style={{ color: '#888', padding: '5px 0' }}
                    >
                        Brand 01
                    </div>
                )}
                <div
                    className={classNames(innerPrice, {
                        [textCenter]: !isHomePage
                    })}
                    style={{
                        color: isHomePage ? '#333' : '#888'
                    }}
                >
                    ${price}
                </div>
                {!isHomePage && (
                    <div
                        className={classNames(boxBtn, {
                            [leftBtn]: !isShowGrid
                        })}
                    >
                        <Button
                            content={
                                isLoading ? (
                                    <LoadingTextCommon />
                                ) : (
                                    'ADD TO CART'
                                )
                            }
                            onClick={handleAddToCart}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductItem;
