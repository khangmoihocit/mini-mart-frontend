import styles from './styles.module.scss';
import React from 'react';


const MainLayout = ({children}) => {
    const {wrapLayout, container, containerMain} = styles;

    return (
        <main className={wrapLayout}>
            <div className={containerMain}>{children}</div>
        </main>
    );
};

export default MainLayout;