import AdminLayout from '@/components/Layout/AdminLayout';
import { AdminContext } from '@/contexts/AdminProvider';
import DashBoard from '@/pages/Admin/components/DashBoard/DashBoard';
import React, { useContext } from 'react';
import styles from './styles.module.scss';
import { CiHeart } from 'react-icons/ci';

const MainContent = () => {
    const { container, bottomContent, bodyText, iconHeart } = styles;
    const { type } = useContext(AdminContext);

    const handleRenderContext = () => {
        switch (type) {
            case 'dashboard':
                return <DashBoard />;
        }
    };

    return (
        <>
            <div>
                <div className={container}>{handleRenderContext()}</div>
                <div className={bottomContent}>
                    <div className={bodyText}>
                        Copyright © 2025 Hihi. Design with
                    </div>
                    <CiHeart className={iconHeart} />
                    <div className={bodyText}>
                        by{' '}
                        <a href='https://github.com/khangmoihocit'>
                            khangmoihocit
                        </a>{' '}
                         All rights reserved.
                    </div>
                </div>
            </div>
        </>
    );
};

export default MainContent;
