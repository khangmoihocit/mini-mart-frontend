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
                        return (
                            <ProductItem
                                key={item.id}
                                src={item.images[0].imageUrl}
                                preSrc={item.images[1].imageUrl}
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
