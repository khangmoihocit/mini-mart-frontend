import Header from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import React, { useContext, useEffect } from 'react';
import styles from './styles.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Banner from '@pages/OurShop/components/Banner';
import { OurShopProvider, OurShopConText } from '@/contexts/OurShopProvider';
import Filter from '@pages/OurShop/components/Filter';
import ListProduct from '@/pages/OurShop/components/ListProduct';

const OurShopContent = () => {
    const { container, functionBox, specialText, btnBack } = styles;
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setKeyword } = useContext(OurShopConText);

    const handleBackPreviourPage = () => {
        navigate(-1);
    };

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Lấy keyword từ URL params
        const keywordParam = searchParams.get('keyword');
        if (keywordParam) {
            setKeyword(keywordParam);
        }
    }, [searchParams, setKeyword]);

    return (
        <>
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
        </>
    );
};

const OurShop = () => {
    return (
        <OurShopProvider>
            <OurShopContent />
        </OurShopProvider>
    );
};

export default OurShop;
