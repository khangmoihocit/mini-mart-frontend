import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { CiHeart } from 'react-icons/ci';
import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
import { WishlistContext } from '@/contexts/WishlistProvider';
import { SideBarContext } from '@/contexts/SidebarProvider';
import { ToastContext } from '@/contexts/ToastProvider';
import cartService from '@/apis/cartService';
import Cookies from 'js-cookie';
import { formatErrorMessage } from '@/utils/helpers';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

const WishList = () => {
    const { container, boxButton, productList } = styles;
    const { wishlist, clearWishlist } = useContext(WishlistContext);
    const { setIsOpen, setType, handleGetListProducCart } = useContext(SideBarContext);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();
    const userId = Cookies.get('userId');
    const [isLoadingAddAll, setIsLoadingAddAll] = useState(false);

    const handleViewWishlist = () => {
        // Có thể tạo trang riêng để xem toàn bộ wishlist
        // navigate('/wishlist');
        toast.info('Chức năng đang được phát triển');
    };

    const handleAddAllToCart = async () => {
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
            return;
        }

        if (wishlist.length === 0) {
            toast.warning('Danh sách yêu thích trống');
            return;
        }

        try {
            setIsLoadingAddAll(true);
            let successCount = 0;
            let failCount = 0;

            for (const item of wishlist) {
                try {
                    const data = {
                        productId: item.id,
                        quantity: 1
                    };

                    const response = await cartService.addToCart(data);
                    
                    if (response.data.code === 1000 || response.data.code === 0) {
                        successCount++;
                    } else {
                        failCount++;
                    }
                } catch (error) {
                    failCount++;
                    console.error(`Error adding product ${item.id} to cart:`, error);
                }
            }

            if (successCount > 0) {
                toast.success(`Đã thêm ${successCount} sản phẩm vào giỏ hàng`);
                handleGetListProducCart(userId, 'cart');
                setType('cart');
            }

            if (failCount > 0) {
                toast.warning(`${failCount} sản phẩm không thể thêm vào giỏ hàng`);
            }

        } catch (error) {
            const errorMessage = formatErrorMessage(error);
            toast.error(errorMessage);
        } finally {
            setIsLoadingAddAll(false);
        }
    };

    const baseUrlImg = "http://localhost:8081/images/";

    return (
        <div className={container}>
            <div className={productList}>
                <HeaderSideBar
                    icon={<CiHeart style={{ fontSize: '30px' }} />}
                    title={`YÊU THÍCH (${wishlist.length})`}
                />
                {wishlist.length > 0 ? (
                    wishlist.map((item) => (
                        <ItemProduct
                            key={item.id}
                            src={`${baseUrlImg}${item.image}`}
                            nameProduct={item.name}
                            priceProduct={item.price}
                            productId={item.id}
                        />
                    ))
                ) : (
                    <div style={{ 
                        padding: '40px 20px', 
                        textAlign: 'center',
                        color: '#888'
                    }}>
                        <p>Chưa có sản phẩm yêu thích</p>
                        <p style={{ fontSize: '14px', marginTop: '10px' }}>
                            Nhấn vào icon trái tim để thêm sản phẩm
                        </p>
                    </div>
                )}
            </div>
            {wishlist.length > 0 && (
                <div className={boxButton}>
                    <Button 
                        content={'XEM DANH SÁCH YÊU THÍCH'} 
                        onClick={handleViewWishlist}
                    />
                    <Button 
                        content={
                            isLoadingAddAll ? (
                                <LoadingTextCommon />
                            ) : (
                                'THÊM VÀO GIỎ HÀNG'
                            )
                        }
                        onClick={handleAddAllToCart}
                        disabled={isLoadingAddAll}
                    />
                </div>
            )}
        </div>
    );
};

export default WishList;
