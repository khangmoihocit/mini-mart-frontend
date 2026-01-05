import React from 'react';
import styles from '../../styles.module.scss';
import SelectBox from '@/pages/OurShop/components/SelectBox';
import LoadingCart from '@/pages/Cart/components/Loading';
import Cookies from 'js-cookie';

const CartTable = ({ cartData, getData, isLoading, getDataDelete }) => {
    const { cartTable } = styles;

    const showOptions = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' },
        { label: '7', value: '7' }
    ];

    const handleQuantityChange = (cartItemId, newQuantity) => {
        getData(cartItemId, parseInt(newQuantity));
    };

    const baseUrlImg = "http://localhost:8081/images/"
    const listProductCart = cartData?.items || [];
    return (
        <div className={cartTable}>
            <table>
                <thead>
                    <tr>
                        <th>PRODUCT</th>
                        <th />
                        <th>PRICE</th>
                        <th>SKU</th>
                        <th>QUANTITY</th>
                        <th>SUBTOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    {listProductCart.map((item) => {
                        // Ưu tiên salePrice nếu có, không thì dùng price
                        const displayPrice = item.salePrice || item.price;
                        const hasDiscount = item.salePrice && item.salePrice < item.price;
                        
                        return (
                            <tr key={item.id}>
                                <td className={styles.product}>
                                    <img src={`${baseUrlImg}${item.imageUrl}`} alt={item.productName} />
                                    <div>
                                        <p>{item.productName}</p>
                                        {item.sizeName && <p>Size: {item.sizeName}</p>}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        onClick={() => getDataDelete(item.id)}
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                    >
                                        &#128465;
                                    </div>
                                </td>
                                <td>
                                    {hasDiscount && (
                                        <span style={{ textDecoration: 'line-through', color: '#999', marginRight: '8px' }}>
                                            {item.price.toLocaleString()} đ
                                        </span>
                                    )}
                                    <span style={{ color: hasDiscount ? '#e53935' : 'inherit', fontWeight: hasDiscount ? 'bold' : 'normal' }}>
                                        {displayPrice.toLocaleString()} đ
                                    </span>
                                </td>
                                <td>{item.id}</td>
                                <td>
                                    <SelectBox
                                        options={showOptions}
                                        getValue={(newQty) => handleQuantityChange(item.id, newQty)}
                                        type='show'
                                        defaultValue={item.quantity}
                                    />
                                </td>
                                <td style={{ fontWeight: 'bold' }}>
                                    {item.subtotal.toLocaleString()} đ
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            {isLoading && <LoadingCart />}
        </div>
    );
};

export default CartTable;
