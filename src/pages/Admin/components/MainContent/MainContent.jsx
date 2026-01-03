import { AdminContext } from '@/contexts/AdminProvider';
import DashBoard from '@/pages/Admin/components/DashBoard/DashBoard';
import React, { useContext } from 'react';
import styles from './styles.module.scss';
import { CiHeart } from 'react-icons/ci';
import classNames from 'classnames';
import ProductList from '@/pages/Admin/components/Product/ProductList/ProductList';
import UserList from '@/pages/Admin/components/User/UserList/UserList';
import Login from '@/pages/Login/Login';
import LoadingDemo from '@/components/LoadingDemo/LoadingDemo';
import UserUpdate from '@/pages/Admin/components/User/UserUpdate/UserUpdate';

import CategoryAdd from '@/pages/Admin/components/Category/CategoryAdd/CategoryAdd';
import CategoryList from '@/pages/Admin/components/Category/CategoryList/CategoryList';
import ProductAdd from '@/pages/Admin/components/Product/ProductAdd/ProductAdd';
import ProductUpdate from '@/pages/Admin/components/Product/ProductUpdate/ProductUpdate';


const MainContent = () => {
    const {
        container,
        bottomContent,
        bodyText,
        iconHeart,
        containerMainContent,
        sliceContainerMainContent
    } = styles;

    const { type, isOpenSidebar } = useContext(AdminContext);

    const handleRenderContext = () => {
        switch (type) {
            case 'dashboard':
                return <DashBoard />;
            case 'product-list':
                return <ProductList />;
            case 'product-add':
                return <ProductAdd />;
            case 'product-update':
                return <ProductUpdate />;
            case 'user-list':
                return <UserList />;
            case 'user-update':
                return <UserUpdate />;
            case 'user-login':
                return <Login />;
            case 'category-add':
                return <CategoryAdd />;
            case 'category-list':
                return <CategoryList />;
            case 'setting-loading':
                return <LoadingDemo />;
            default:
                return <DashBoard />;
        }
    };

    return (
        <>
            <div
                className={classNames(containerMainContent, {
                    [sliceContainerMainContent]: !isOpenSidebar
                })}
            >
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
