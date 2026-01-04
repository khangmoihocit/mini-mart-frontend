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
                        const firstImage = item.images[0]?.imageUrl;
                        const secondImage = item.images[1]?.imageUrl || item.images[0]?.imageUrl;
                        
                        return (
                            <ProductItem
                                key={item.id}
                                src={firstImage}
                                preSrc={secondImage}
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
