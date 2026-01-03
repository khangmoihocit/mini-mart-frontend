import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import React from 'react';

const AdvanceHeadling = () => {
    const { container, headline, containerMiddleBox, desc, title } = styles;

    return (
        <>
            <MainLayout>
                <div className={container}>
                    <div className={headline}></div>
                    <div className={containerMiddleBox}>
                        <p className={desc}>don't miss super offers</p>
                        <p className={title}>Our best products</p>
                    </div>
                    <div className={headline}></div>
                </div>
            </MainLayout>
        </>
    );
};

export default AdvanceHeadling;
