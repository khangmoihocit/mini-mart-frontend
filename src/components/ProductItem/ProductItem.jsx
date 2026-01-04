import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import cartService from '@/apis/cartService';
import { formatErrorMessage } from '@/utils/helpers';

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
    const navigate = useNavigate();

    const handleChooseSize = size => {
        setSizeChoose(size);
    };

    const handleClearSize = () => {
        setSizeChoose('');
    };

    const handleAddToCart = async () => {
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
            return;
        }

        if (details.sizes && details.sizes.length > 0 && !sizeChoose) {
            toast.warning('Vui lòng chọn size sản phẩm');
            return;
        }

        let productSizeId = null;
        if (sizeChoose && details.sizes) {
            const selectedSize = details.sizes.find(s => s.sizeName === sizeChoose);
            if (selectedSize) {
                productSizeId = selectedSize.id;
            }
        }

        const data = {
            productId: details.id,
            quantity: 1
        };

        if (productSizeId) {
            data.productSizeId = productSizeId;
        }

        try {
            setIsLoading(true);
            const response = await cartService.addToCart(data);
            
            if (response.data.code === 1000 || response.data.code === 0) {
                toast.success('Thêm sản phẩm vào giỏ hàng thành công');
                setIsOpen(true);
                setType('cart');
                handleGetListProducCart(userId, 'cart');
                setSizeChoose('');
            } else {
                toast.error(response.data.message || 'Có lỗi xảy ra');
            }
        } catch (error) {
            const errorMessage = formatErrorMessage(error);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigateToDetail = () => {
        if (details?.id) {
            navigate(`/product/${details.id}`);
        }
    };

    const baseUrlImg = "http://localhost:8081/images/"

    return (
        <div
            className={isShowGrid ? '' : container}
            style={{ marginTop: '20px' }}
        >
            <div className={classNames(boxImg, { [largImg]: !isShowGrid })} onClick={handleNavigateToDetail} style={{ cursor: 'pointer' }}>
                <img src={`${baseUrlImg}${src}`} alt='' />
                <img src={`${baseUrlImg}${preSrc}`} alt='' className={showImgWhenHover} />
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
                        {details.sizes && details.sizes.map((item, index) => {
                            return (
                                <div
                                    className={classNames(size, {
                                        [isActiveSize]: item.sizeName === sizeChoose
                                    })}
                                    key={index}
                                    onClick={() => handleChooseSize(item.sizeName)}
                                >
                                    {item.sizeName}
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
                    onClick={handleNavigateToDetail}
                    style={{ cursor: 'pointer' }}
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
                    {price}đ
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
                                    'THÊM GIỎ HÀNG'
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
