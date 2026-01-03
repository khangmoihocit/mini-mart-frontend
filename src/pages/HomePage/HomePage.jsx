import Banner from '@components/Banner/Banner';
import Header from '@components/Header/Header';
import styles from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import Info from '@components/Info/Info';
import AdvanceHeadling from '@components/AdvanceHeadling/AdvanceHeadling';
import HeadlingListProduct from '@components/HeadingListProduct/HeadingListProduct';
import PopularProduct from '@components/PopularProduct/PopularProduct';
import SaleHomePage from '@components/SaleHomePage/SaleHomePage';
import Footer from '@components/Footer/Footer';

const HomePage = () => {
    const { container } = styles;
    const [listProducts, setListProducts] = useState([]);
    const query = {sortType: 0, page: 1, limit: 'all'};

    useEffect(() => {
        
    }, []);

    return (
        <div>
            <div className={container}>
                <Header />
                <Banner />
                <Info />
                <AdvanceHeadling />
                <HeadlingListProduct data={listProducts.slice(0, 2)} />
                <PopularProduct
                    data={listProducts.slice(2, listProducts.length)}
                />
                <SaleHomePage />
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
