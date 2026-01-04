import React from 'react';
import styles from '../styles.module.scss';
import CountdownTimer from '@components/CountdownTimer/CountdownTimer';
import Button from '@components/Button/Button';

const Banner = () => {
    const { containerBanner, contentBox, title, boxBtn, countdownBox} = styles;
    const targetDate = '2026-01-27T00:00:00';

    return (
        <div className={containerBanner}>
            <div className={contentBox}>
                <div className={countdownBox}>
                    <CountdownTimer targetDate={targetDate} />
                </div>
                <div className={title}>Phong cách cổ điển Tái Xuất</div>
                <div className={boxBtn}>
                    <Button content={'Mua Ngay'} onClick={() => {}} />
                </div>
            </div>
        </div>
    );
};

export default Banner;
