import { lazy } from 'react';

export const AdminRoutes = {
    // Dashboard
    Dashboard: lazy(() => import('@/pages/Admin/components/DashBoard/DashBoard')),
    
    // User Management
    UserList: lazy(() => import('@/pages/Admin/components/User/UserList/UserList')),
    UserUpdate: lazy(() => import('@/pages/Admin/components/User/UserUpdate/UserUpdate')),
    
    // Product Management
    ProductList: lazy(() => import('@/pages/Admin/components/Product/ProductList/ProductList')),
    ProductAdd: lazy(() => import('@/pages/Admin/components/Product/ProductAdd/ProductAdd')),
    
    // Demo Components (Development only)
    LoadingDemo: lazy(() => import('@/components/LoadingDemo/LoadingDemo')),
};

export const AdminLoadingFallback = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        fontSize: '16px',
        color: '#666'
    }}>
        Đang tải...
    </div>
);