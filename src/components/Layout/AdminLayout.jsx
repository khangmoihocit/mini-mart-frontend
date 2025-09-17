import React from 'react';
import styles from './styles.module.scss';

const AdminLayout = ({ children }) => {
    const { wrapLayout, containerAdmin } = styles;

    return (
        <main className={wrapLayout}>
            <div className={containerAdmin}>{children}</div>
        </main>
    );
};

export default AdminLayout;
