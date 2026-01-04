import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

const formatNumber = number => String(number).padStart(2, '0');

const CountdownTimer = ({ targetDate }) => {
    const { box, title } = styles;

    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Mins: Math.floor((difference / 1000 / 60) % 60),
                Secs: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(intervalId);
    }, [targetDate]); // Chạy lại effect nếu targetDate thay đổi

    const timerComponents = Object.keys(timeLeft).map(interval => {
        return (
            <span className={box} key={interval}>
                {formatNumber(timeLeft[interval])}{' '}
                <span className={title}>{interval}</span>{' '}
            </span>
        );
    });

    return (
        <>{timerComponents.length ? timerComponents : <span className={box}>Hết giờ!</span>}</>
    );
};

export default CountdownTimer;
