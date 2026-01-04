import { useContext, useState } from 'react';
import { SideBarContext } from '@/contexts/SidebarProvider';
import { WishlistContext } from '@/contexts/WishlistProvider';
import { ToastContext } from '@/contexts/ToastProvider';
import styles from './styles.module.scss';
import SliderCommon from '@components/SliderCommon/SliderCommon';
import SelectBox from '@/pages/OurShop/components/SelectBox';
import Button from '@components/Button/Button';
import { PiShoppingCartThin } from 'react-icons/pi';
import { TfiReload } from 'react-icons/tfi';
import { CiHeart } from 'react-icons/ci';
import { FaXTwitter } from 'react-icons/fa6';
import { FaFacebookF } from 'react-icons/fa';
import cls from 'classnames';
import Cookies from 'js-cookie';
import cartService from '@/apis/cartService';
import { formatErrorMessage } from '@/utils/helpers';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';

function DetailProduct() {
    const {
        container,
        title,
        price,
        des,
        boxSize,
        size,
        label,
        boxAddToCart,
        boxOr,
        line,
        or,
        boxAddOther,
        boxFooter,
        isActive
    } = styles;

    const {
        detailProduct,
        setType,
        setIsOpen,
        handleGetListProducCart
    } = useContext(SideBarContext);
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const { toast } = useContext(ToastContext);
    const userId = Cookies.get('userId');
    const [chooseSize, setChooseSize] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [isLoading, setIsLoading] = useState(false);
    
    if (!detailProduct) {
        return (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                <p>Không có thông tin sản phẩm</p>
            </div>
        );
    }
    
    const isWishlisted = isInWishlist(detailProduct?.id);
    const baseUrlImg = "http://localhost:8081/images/";
    
    // Helper function để lấy giá trị string từ object hoặc string
    const getDisplayValue = (value, defaultValue = '') => {
        if (!value) return defaultValue;
        if (typeof value === 'object' && value.name) return value.name;
        if (typeof value === 'string') return value;
        return String(value);
    };
    
    const displaySku = getDisplayValue(detailProduct.sku, `SKU-${detailProduct.id}`);
    const displayCategory = getDisplayValue(detailProduct.category, 'Uncategorized');

    const showOptions = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' }
    ];

    const handleGetSize = (value) => {
        setChooseSize(value);
    };

    const handleClearSize = () => {
        setChooseSize('');
    };

    const handleGetQuantity = (value) => {
        setQuantity(value);
    };

    const handleAddToCart = async () => {
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
            return;
        }

        if (detailProduct.sizes && detailProduct.sizes.length > 0 && !chooseSize) {
            toast.warning('Vui lòng chọn size sản phẩm');
            return;
        }

        let productSizeId = null;
        if (chooseSize && detailProduct.sizes) {
            const selectedSize = detailProduct.sizes.find(s => s.sizeName === chooseSize);
            if (selectedSize) {
                productSizeId = selectedSize.id;
            }
        }

        const data = {
            productId: detailProduct.id,
            quantity: parseInt(quantity)
        };

        if (productSizeId) {
            data.productSizeId = productSizeId;
        }

        try {
            setIsLoading(true);
            const response = await cartService.addToCart(data);
            
            if (response.data.code === 1000 || response.data.code === 0) {
                toast.success('Thêm sản phẩm vào giỏ hàng thành công');
                setType('cart');
                handleGetListProducCart(userId, 'cart');
                setChooseSize('');
                setQuantity('1');
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
    
    const handleAddToWishlist = () => {
        const result = toggleWishlist(detailProduct);
        
        if (result.success) {
            if (isWishlisted) {
                toast.info(result.message);
            } else {
                toast.success(result.message);
            }
        } else {
            toast.warning(result.message);
        }
    };

    return (
        <div className={container}>
            <SliderCommon data={detailProduct.images.map(img => `${baseUrlImg}${img}`)} />

            <div className={title}>{detailProduct.name}</div>
            <div className={price}>{detailProduct.price}đ</div>
            <div className={des}>{detailProduct.description}</div>

            {detailProduct.sizes && detailProduct.sizes.length > 0 && (
                <>
                    <div className={label}>Size {chooseSize}</div>
                    <div className={boxSize}>
                        {detailProduct.sizes.map((item, index) => (
                    <div
                        className={cls(size, {
                            [isActive]: item.sizeName === chooseSize
                        })}
                        key={index}
                        onClick={() => handleGetSize(item.sizeName)}
                    >
                        {item.sizeName}
                    </div>
                ))}
                    </div>
                    {chooseSize && (
                <div
                    style={{
                        fontSize: '12px',
                        marginTop: '3px',
                        cursor: 'pointer'
                    }}
                    onClick={handleClearSize}
                >
                        clear
                    </div>
                    )}
                </>
            )}

            <div className={boxAddToCart}>
                <SelectBox
                    options={showOptions}
                    type='show'
                    defaultValue={quantity}
                    getValue={handleGetQuantity}
                />

                <div>
                    <Button
                        content={
                            isLoading ? (
                                <LoadingTextCommon />
                            ) : (
                                <div>
                                    <PiShoppingCartThin /> Thêm vào giỏ hàng
                                </div>
                            )
                        }
                        onClick={handleAddToCart}
                        disabled={isLoading}
                    />
                </div>
            </div>

            <div className={boxAddOther}>
                <TfiReload style={{ fontSize: '23px' }} />
                <div>Thêm vào so sánh</div>
            </div>

            <div className={boxAddOther} onClick={handleAddToWishlist} style={{ cursor: 'pointer' }}>
                {isWishlisted ? (
                    <IoMdHeart style={{ fontSize: '25px', color: '#ff4444' }} />
                ) : (
                    <IoMdHeartEmpty style={{ fontSize: '25px' }} />
                )}
                <div>{isWishlisted ? 'Xóa khỏi danh sách yêu thích' : 'Thêm vào danh sách yêu thích'}</div>
            </div>

            <div className={boxFooter}>
                SKU: <span>{displaySku}</span>
            </div>
            <div className={boxFooter}>
                Danh mục: <span>{displayCategory}</span>
            </div>
            <div className={boxFooter}>
                Thời gian giao hàng dự kiến: <span>3 - 5 ngày</span>
            </div>
            <div className={boxFooter}>
                Chia sẻ:{' '}
                <span>
                    <FaXTwitter />
                    <FaFacebookF />
                </span>
            </div>
        </div>
    );
}

export default DetailProduct;
