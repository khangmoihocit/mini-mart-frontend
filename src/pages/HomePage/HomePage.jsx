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
import productService from '@/apis/productService';
import { toast } from 'react-toastify';
import { formatErrorMessage } from '@/utils/helpers';

const HomePage = () => {
    const { container } = styles;
    const [listProducts, setListProducts] = useState([]);
    const query = {sortType: 0, page: 1, limit: 'all'};

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productService.getAll();
                setListProducts(response.data.result);
            } catch (error) {
                toast.error(formatErrorMessage(error));
            }
        };
        fetchProducts();
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
                    data={listProducts.slice(2, 50)}
                />
                <SaleHomePage />
                <Footer />
            </div>
        </div>
    );
};

export default HomePage;
