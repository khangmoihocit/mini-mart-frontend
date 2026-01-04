import { lazy } from 'react';

const routers = [
    {
        path: '/',
        component: lazy(() => import('@pages/HomePage/HomePage'))
    },
    {
        path: '/login',
        component: lazy(() => import('@pages/Login/Login'))
    },
    {
        path: '/admin',
        component: lazy(() => import('@pages/Admin/Admin'))
    },
    {
        path: '/shop',
        component: lazy(() => import('@pages/OurShop/OurShop'))
    },
    {
        path: '/cart',
        component: lazy(() => import('@pages/Cart/CartPage'))
    },
    {
        path: '/product/:id',
        component: lazy(() => import('@pages/ProductDetail/ProductDetail'))
    },
];

export default routers;