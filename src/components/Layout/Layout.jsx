import styles from './styles.module.scss';
import React from 'react';


const MainLayout = ({children}) => {
    const {wrapLayout, container} = styles;

    return (
        <main className={wrapLayout}>
            <div className={container}>{children}</div>
        </main>
    );
};

export default MainLayout;