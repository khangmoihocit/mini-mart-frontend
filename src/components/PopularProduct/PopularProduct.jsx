import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import React from 'react';
import ProductItem from '@components/ProductItem/ProductItem';

const PopularProduct = ({data}) => {
    const { container } = styles;

    return (
        <>
            <MainLayout>
                <div className={container}>
                    {data.map(item => {
                        // Handle case when there's only 1 image
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
            </MainLayout>
        </>
    );
};

export default PopularProduct;
