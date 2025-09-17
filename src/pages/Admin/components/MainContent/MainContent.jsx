import AdminLayout from '@/components/Layout/AdminLayout';
import { AdminContext } from '@/contexts/AdminProvider';
import DashBoard from '@/pages/Admin/components/DashBoard/DashBoard';
import React, { useContext } from 'react';

const MainContent = () => {
    const { type } = useContext(AdminContext);

    const handleRenderContext = () => {
        switch (type) {
            case 'dashboard':
                return <DashBoard />;
        }
    };

    return (
        <>
            <AdminLayout>{handleRenderContext()}</AdminLayout>
        </>
    );
};

export default MainContent;
