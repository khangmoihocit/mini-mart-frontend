import React, { useContext, useState } from 'react';
import styles from './styles.module.scss';
import { IoMdClose } from 'react-icons/io';
import { SideBarContext } from '@/contexts/SidebarProvider';
// import { deleteItem } from '@/apis/cartService';
import { ToastContext } from '@/contexts/ToastProvider';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

const ItemProduct = ({
    src,
    nameProduct,
    priceProduct,
    skuProduct,
    sizeProduct,
    quantity,
    productId,
    userId
}) => {
    const { container, boxContent, price, title, boxClose, size, overLoading } = styles;
    const { type, handleGetListProducCart } = useContext(SideBarContext);
    const isShowSize = type === 'cart' ? true : false;
    const { toast } = useContext(ToastContext);
    const [isDelete, setIsDelete] = useState(false);

    const handleRemoveItem = () => {
        setIsDelete(true);
        // deleteItem({ productId, userId })
        //     .then(response => {
        //         // toast.success(response.data.msg);
        //         setIsDelete(false);
        //         handleGetListProducCart(userId, 'cart');
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         setIsDelete(false);
        //     });
    };

    return (
        <div className={container}>
            <img src={src} alt='' />
            <div className={boxClose} onClick={handleRemoveItem}>
                <IoMdClose style={{ fontSize: '20px', color: '#c1c1c1' }} />
            </div>
            <div className={boxContent}>
                <div className={title}>{nameProduct}</div>
                {isShowSize && <div className={size}>Size: {sizeProduct}</div>}
                <div className={price}>
                    {quantity} x ${priceProduct}
                </div>
                {isShowSize && <div className={price}>SKU: {skuProduct}</div>}
            </div>
            {isDelete && (<div className={overLoading}>
                <LoadingTextCommon />
            </div>)}
        </div>
    );
};

export default ItemProduct;
