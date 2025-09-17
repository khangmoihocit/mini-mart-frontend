import AdminLayout from '@/components/Layout/AdminLayout';
import { AdminContext } from '@/contexts/AdminProvider';
import DashBoard from '@/pages/Admin/components/DashBoard/DashBoard';
import React, { useContext } from 'react';
import styles from './styles.module.scss';

const MainContent = () => {
    const {container} = styles;
    const { type } = useContext(AdminContext);

    const handleRenderContext = () => {
        switch (type) {
            case 'dashboard':
                return <DashBoard />;
        }
    };

    return (
        <>
            <div className={container}>{handleRenderContext()}</div>
        </>
    );
};

export default MainContent;
