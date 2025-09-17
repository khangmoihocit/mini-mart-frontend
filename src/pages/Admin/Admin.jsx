import { AdminProvider } from '@/contexts/AdminProvider';
import Header from '@/pages/Admin/components/Header/Header';
import MainContent from '@/pages/Admin/components/MainContent/MainContent';
import Sidebar from '@/pages/Admin/components/Sidebar/Sidebar';
import React from 'react';
import styles from './styles.module.scss';

const Admin = () => {
    const { containerAdmin1, containerSidebar, containerRight, containerMainContent } = styles;

    return (
        <AdminProvider>
            <div className={containerAdmin1}>
                <div className={containerSidebar}>
                    <Sidebar />
                </div>
                <div className={containerRight}>
                    <Header />
                    <div className={containerMainContent}>
                        <MainContent />
                    </div>
                </div>
            </div>
        </AdminProvider>
    );
};

export default Admin;
