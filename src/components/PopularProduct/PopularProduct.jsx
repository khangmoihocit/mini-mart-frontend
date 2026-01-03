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
            </MainLayout>
        </>
    );
};

export default PopularProduct;
