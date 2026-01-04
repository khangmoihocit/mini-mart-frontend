import React from 'react';
import styles from './styles.module.scss';
import { CiHeart } from 'react-icons/ci';
import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
const WishList = () => {
    const { container, boxButton } = styles;

    return (
        <div className={container}>
            <div>
                <HeaderSideBar
                    icon={<CiHeart style={{ fontSize: '30px' }} />}
                    title={'WISHLIST'}
                />
                <ItemProduct />
            </div>
            <div className={boxButton}>
                <Button content={'VIEW WISHLIST'} />
                <Button content={'ADD TO CART'} />
            </div>
        </div>
    );
};

export default WishList;
