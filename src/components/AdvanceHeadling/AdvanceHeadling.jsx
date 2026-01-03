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
                        <p className={desc}>Không bỏ lỡ các ưu đãi siêu hấp dẫn</p>
                        <p className={title}>Sản phẩm tốt nhất của chúng tôi</p>
                    </div>
                    <div className={headline}></div>
                </div>
            </MainLayout>
        </>
    );
};

export default AdvanceHeadling;
