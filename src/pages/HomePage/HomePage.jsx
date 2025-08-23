import React from 'react';
import styles from './styles.module.scss';

const HomePage = () => {
    const {text} = styles;

    return (
        <div className={text}>
            Home page
        </div>
    );
};

export default HomePage;