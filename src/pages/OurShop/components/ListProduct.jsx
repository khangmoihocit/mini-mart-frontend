import MainLayout from '@components/Layout/Layout';
import React, { useContext } from 'react';
import { OurShopConText } from '@/contexts/OurShopProvider';
import styles from '../styles.module.scss';
import ProductItem from '@components/ProductItem/ProductItem';
import Button from '@components/Button/Button';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

const ListProduct = () => {
    const { containerProduct, sectionListProduct, loading } = styles;
    const { products, isShowGrid, isLoading, handleLoadMore, total, isLoadMore } =
        useContext(OurShopConText);

    return (
        <div className={sectionListProduct}>
            <MainLayout>
                {isLoading ? (
                    <div>Loading ... ?</div>
                ) : (
                    <>
                        <div className={isShowGrid ? containerProduct : ''}>
                            {products.map(item => {
                                return (
                                    <ProductItem
                                        key={item._id}
                                        src={item.images[0]}
                                        preSrc={item.images[1]}
                                        name={item.name}
                                        price={item.price}
                                        details={item}
                                        isHomePage={false}
                                        isShowGrid={isShowGrid}
                                    />
                                );
                            })}
                        </div>
                        {products.length < total && (
                            <div
                                style={{ width: '180px', margin: '50px auto' }}
                            >
                                <Button
                                    onClick={handleLoadMore}
                                    content={isLoadMore ? <LoadingTextCommon /> : 'LOAD MORE PRODUCT'}
                                />
                            </div>
                        )}
                    </>
                )}
            </MainLayout>
        </div>
    );
};

export default ListProduct;
