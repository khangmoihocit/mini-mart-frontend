import Header from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import React, { useContext } from 'react';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Banner from '@pages/OurShop/components/Banner';
import { OurShopProvider } from '@/contexts/OurShopProvider';
import Filter from '@pages/OurShop/components/Filter';
import ListProduct from '@/pages/OurShop/components/ListProduct';

const OurShop = () => {
    const { container, functionBox, specialText, btnBack } = styles;
    const navigate = useNavigate();

    const handleBackPreviourPage = () => {
        navigate(-1);
    };
    return (
        <OurShopProvider>
            <Header />
            <MainLayout>
                <div className={container}>
                    <div className={functionBox}>
                        <div>
                            Home {'>'} <span className={specialText}>Shop</span>
                        </div>
                        <div
                            className={btnBack}
                            onClick={handleBackPreviourPage}
                        >
                            {'<'} Return to previous page
                        </div>
                    </div>
                </div>

                <Banner />
                <Filter />
                <ListProduct />
            </MainLayout>
        </OurShopProvider>
    );
};

export default OurShop;
