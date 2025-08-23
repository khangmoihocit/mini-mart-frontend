import React from 'react';
import styles from './styles.module.scss';

const MainLayout = ({ children }) => {
    const { wrapLayout, containerMain } = styles;

    return (
        <main className={wrapLayout}>
            <div className={containerMain}>{children}</div>
        </main>
    );
};

export default MainLayout;
