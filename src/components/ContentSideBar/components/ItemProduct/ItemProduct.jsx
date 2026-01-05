import React, { useContext, useState } from 'react';
import styles from './styles.module.scss';
import { IoMdClose } from 'react-icons/io';
import { SideBarContext } from '@/contexts/SidebarProvider';
import { WishlistContext } from '@/contexts/WishlistProvider';
import cartService from '@/apis/cartService';
import { ToastContext } from '@/contexts/ToastProvider';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';
import { formatErrorMessage } from '@/utils/helpers';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const ItemProduct = ({
    src,
    nameProduct,
    priceProduct,
    skuProduct,
    sizeProduct,
    quantity,
    productId,
    userId,
    cartItemId,
    imageUrl
}) => {
    const { container, boxContent, price, title, boxClose, size, overLoading } = styles;
    const { type, handleGetListProducCart, setIsOpen } = useContext(SideBarContext);
    const { removeFromWishlist } = useContext(WishlistContext);
    const isShowSize = type === 'cart' ? true : false;
    const { toast } = useContext(ToastContext);
    const [isDelete, setIsDelete] = useState(false);
    const baseUrlImg = "http://localhost:8081/images/";
    const navigate = useNavigate();

    const handleRemoveItem = async () => {
        // Xử lý xóa từ wishlist
        if (type === 'wishList' || type === 'wishlist') {
            if (!productId) {
                toast.error('Không thể xóa sản phẩm');
                return;
            }

            try {
                setIsDelete(true);
                const result = removeFromWishlist(productId);
                if (result.success) {
                    toast.success(result.message);
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                toast.error('Có lỗi xảy ra khi xóa sản phẩm');
            } finally {
                setIsDelete(false);
            }
            return;
        }

        // Xử lý xóa từ cart
        if (!cartItemId) {
            toast.error('Không thể xóa sản phẩm');
            return;
        }

        try {
            setIsDelete(true);
            const response = await cartService.removeFromCart(cartItemId);
            
            if (response.data.code === 1000 || response.data.code === 0) {
                toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
                const currentUserId = Cookies.get('userId');
                handleGetListProducCart(currentUserId, 'cart');
            }
        } catch (error) {
            toast.error(formatErrorMessage(error));
        } finally {
            setIsDelete(false);
        }
    };

    const displayImage = imageUrl || src;

    return (
        <div className={container} onClick={()=> {
            navigate(`/product/${productId}`);
            setIsOpen(false);
        }}>
            <img src={displayImage.startsWith('http') ? displayImage : `${baseUrlImg}${displayImage}`} alt='' />
            <div className={boxClose} onClick={handleRemoveItem}>
                <IoMdClose style={{ fontSize: '20px', color: '#c1c1c1' }} />
            </div>
            <div className={boxContent}>
                <div className={title}>{nameProduct}</div>
                {isShowSize && sizeProduct && <div className={size}>Size: {sizeProduct}</div>}
                <div className={price}>
                    {quantity} x {priceProduct}đ
                </div>
                {isShowSize && skuProduct && <div className={price}>SKU: {skuProduct}</div>}
            </div>
            {isDelete && (<div className={overLoading}>
                <LoadingTextCommon />
            </div>)}
        </div>
    );
};

export default ItemProduct;
