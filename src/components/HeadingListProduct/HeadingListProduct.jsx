import CountdownTimer from '@components/CountdownTimer/CountdownTimer';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import React from 'react';
import CountdownBanner from '@components/CountdownBanner/CountdownBanner';
import ProductItem from '@components/ProductItem/ProductItem';

const HeadlingListProduct = ({ data }) => {
    const { container, containerItem } = styles;

    return (
        <MainLayout>
            <div className={container}>
                <CountdownBanner />
                <div className={containerItem}>
                    {data.map(item => {
                        return (
                            <ProductItem
                                key={item._id}
                                src={item.images[0]}
                                preSrc={item.images[1]}
                                name={item.name}
                                price={item.price}
                                details={item}
                            />
                        );
                    })}
                </div>
            </div>
        </MainLayout>
    );
};

export default HeadlingListProduct;
