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
    const { products, isShowGrid, isLoading, handleLoadMore, totalPages, pageNo, isLoadMore } =
        useContext(OurShopConText);

    return (
        <div className={sectionListProduct}>
            <MainLayout>
                {isLoading ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>Đang tải sản phẩm...</div>
                ) : products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>Không tìm thấy sản phẩm</div>
                ) : (
                    <>
                        <div className={isShowGrid ? containerProduct : ''}>
                            {products.map(item => {
                                const firstImage = item.images[0]?.imageUrl;
                                const secondImage = item.images[1]?.imageUrl || item.images[0]?.imageUrl;
                                
                                return (
                                    <ProductItem
                                        key={item.id}
                                        src={firstImage}
                                        preSrc={secondImage}
                                        name={item.name}
                                        price={item.salePrice || item.price}
                                        details={item}
                                        isHomePage={false}
                                        isShowGrid={isShowGrid}
                                    />
                                );
                            })}
                        </div>
                        {pageNo < totalPages && (
                            <div
                                style={{ width: '180px', margin: '50px auto' }}
                            >
                                <Button
                                    onClick={handleLoadMore}
                                    content={isLoadMore ? <LoadingTextCommon /> : 'TẢI THÊM SẢN PHẨM'}
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
