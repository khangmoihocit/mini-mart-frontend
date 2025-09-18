import { lazy } from 'react';

// Lazy load các components admin
export const AdminRoutes = {
    // Dashboard
    Dashboard: lazy(() => import('@/pages/Admin/components/DashBoard/DashBoard')),
    
    // User Management
    UserList: lazy(() => import('@/pages/Admin/components/User/UserList/UserList')),
    UserUpdate: lazy(() => import('@/pages/Admin/components/User/UserUpdate/UserUpdate')),
    
    // Product Management
    ProductList: lazy(() => import('@/pages/Admin/components/Product/ProductList/ProductList')),
    ProductAdd: lazy(() => import('@/pages/Admin/components/Product/ProductAdd/ProductAdd')),
};

// Centralized loading component
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