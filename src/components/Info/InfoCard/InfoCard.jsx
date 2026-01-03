import React from 'react';
import styles from '../styles.module.scss';

const InfoCard = ({subTitle, description, src}) => {
    const {containerCard, containerContent, title, desc} = styles;

    return (
        <div className={containerCard}>
            <img width={40} height={41} src={src} alt="" />
            <div className={containerContent}>
                <div className={title}>{subTitle}</div>
                <div className={desc}>{description}</div>
            </div>
        </div>
    );
};

export default InfoCard;