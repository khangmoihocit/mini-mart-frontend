import React from 'react';
import styles from './styles.module.scss';

const MenuLanguage = ({ setTypeLanguage, value, src, content }) => {
    const {boxLanguage} = styles;

    return (
        <div onClick={() => setTypeLanguage(value)} className={boxLanguage}>
            <img src={src} alt={content} />
            <p>{content}</p>
        </div>
    );
};

export default MenuLanguage;
