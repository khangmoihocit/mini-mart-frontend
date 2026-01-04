import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import cartService from '@/apis/cartService';
import { toast } from 'react-toastify';
import { formatErrorMessage } from '@/utils/helpers';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import Footer from '@/components/Footer/Footer';

const CartPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [couponCode, setCouponCode] = useState('');
    const [updatingItems, setUpdatingItems] = useState({});
    const baseUrlImg = "http://localhost:8081/images/";

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await cartService.getCart();
            if (response.data.code === 1000 || response.data.code === 0) {
                setCart(response.data.result);
            }
        } catch (error) {
            toast.error(formatErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    };

    const handleQuantityChange = async (cartItemId, newQuantity) => {
        try {
            setUpdatingItems(prev => ({ ...prev, [cartItemId]: true }));
            const response = await cartService.updateCartItem(cartItemId, { quantity: parseInt(newQuantity) });
            
            if (response.data.code === 1000 || response.data.code === 0) {
                toast.success('Cập nhật số lượng thành công');
                fetchCart();
            }
        } catch (error) {
            toast.error(formatErrorMessage(error));
        } finally {
            setUpdatingItems(prev => ({ ...prev, [cartItemId]: false }));
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            const response = await cartService.removeFromCart(cartItemId);
            if (response.data.code === 1000 || response.data.code === 0) {
                toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
                fetchCart();
            }
        } catch (error) {
            toast.error(formatErrorMessage(error));
        }
    };

    const handleClearCart = async () => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?')) return;
        
        try {
            const response = await cartService.clearCart();
            if (response.data.code === 1000 || response.data.code === 0) {
                toast.success('Đã xóa toàn bộ giỏ hàng');
                fetchCart();
            }
        } catch (error) {
            toast.error(formatErrorMessage(error));
        }
    };

    const handleApplyCoupon = () => {
        if (!couponCode.trim()) {
            toast.warning('Vui lòng nhập mã giảm giá');
            return;
        }
        toast.info('Tính năng mã giảm giá đang được phát triển');
    };

    if (loading) {
        return (
            <>
                <Header />
                <MainLayout>
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <h3>Đang tải giỏ hàng...</h3>
                    </div>
                </MainLayout>
            </>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <>
                <Header />
                <MainLayout>
                    <div className={styles.emptyCart}>
                        <h2>Giỏ hàng trống</h2>
                        <p>Chưa có sản phẩm nào trong giỏ hàng của bạn</p>
                        <Button 
                            content="Tiếp tục mua sắm" 
                            onClick={() => navigate('/shop')}
                        />
                    </div>
                </MainLayout>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <MainLayout>
                <div className={styles.cartPage}>
                    {/* Cart Navigation */}
                    <div className={styles.cartNav}>
                        <div className={styles.navItem + ' ' + styles.active}>
                            <span>1</span> Giỏ hàng
                        </div>
                        <div className={styles.navItem}>
                            <span>2</span> Thanh toán
                        </div>
                        <div className={styles.navItem}>
                            <span>3</span> Hoàn tất
                        </div>
                    </div>

                    <div className={styles.cartContent}>
                        {/* Cart Table */}
                        <div className={styles.cartTable}>
                            <div className={styles.tableResponsive}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th colSpan="2">Sản phẩm</th>
                                            <th></th>
                                            <th>Giá</th>
                                            <th>Size</th>
                                            <th>Số lượng</th>
                                            <th>Tổng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.items.map((item) => (
                                            <tr key={item.id}>
                                                <td className={styles.productThumbnail}>
                                                    <img 
                                                        src={`${baseUrlImg}${item.imageUrl}`} 
                                                        alt={item.productName}
                                                        onError={(e) => {
                                                            e.target.src = '/placeholder.png';
                                                        }}
                                                    />
                                                </td>
                                                <td className={styles.productDetails}>
                                                    <div className={styles.productName}>
                                                        {item.productName}
                                                    </div>
                                                    {item.sizeName && (
                                                        <div className={styles.variation}>
                                                            Size: <strong>{item.sizeName}</strong>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className={styles.productRemove}>
                                                    <button 
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className={styles.removeBtn}
                                                        title="Xóa sản phẩm"
                                                    >
                                                        ×
                                                    </button>
                                                </td>
                                                <td className={styles.productPrice}>
                                                    {formatCurrency(item.salePrice || item.price)}
                                                </td>
                                                <td className={styles.productSize}>
                                                    {item.sizeName || '-'}
                                                </td>
                                                <td className={styles.productQuantity}>
                                                    <select 
                                                        value={item.quantity}
                                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                        disabled={updatingItems[item.id]}
                                                        className={styles.quantitySelect}
                                                    >
                                                        {[...Array(Math.min(item.availableQuantity, 10))].map((_, i) => (
                                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className={styles.productSubtotal}>
                                                    <strong>{formatCurrency(item.subtotal)}</strong>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Actions */}
                            <div className={styles.cartActions}>
                                <div className={styles.couponBox}>
                                    {/* <input 
                                        type="text"
                                        placeholder="Mã giảm giá"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className={styles.couponInput}
                                    />
                                    <button 
                                        onClick={handleApplyCoupon}
                                        className={styles.couponBtn}
                                    >
                                        Áp dụng
                                    </button> */}
                                </div>
                                <div className={styles.actionButtons}>
                                    <button 
                                        onClick={handleClearCart}
                                        className={styles.clearCartBtn}
                                    >
                                        Xóa giỏ hàng
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cart Totals */}
                        <div className={styles.cartTotals}>
                            <h3>Tổng giỏ hàng</h3>
                            <div className={styles.totalsTable}>
                                <div className={styles.totalsRow}>
                                    <span>Tạm tính:</span>
                                    <span>{formatCurrency(cart.totalAmount)}</span>
                                </div>
                                <div className={styles.totalsRow + ' ' + styles.total}>
                                    <span>Tổng cộng:</span>
                                    <strong>{formatCurrency(cart.totalAmount)}</strong>
                                </div>
                            </div>
                            <div className={styles.checkoutActions}>
                                <Button 
                                    content="Tiến hành thanh toán"
                                    onClick={() => navigate('/checkout')}
                                    style={{ width: '100%', marginBottom: '10px' }}
                                />
                                <button 
                                    onClick={() => navigate('/shop')}
                                    className={styles.continueShoppingBtn}
                                >
                                    Tiếp tục mua sắm
                                </button>
                            </div>
                            
                            {/* Safe Checkout */}
                            <div className={styles.safeCheckout}>
                                <h4>Thanh toán <span>an toàn</span></h4>
                                <p>Thanh toán của bạn được bảo mật <span>100%</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
            <Footer />
        </>
    );
};

export default CartPage;