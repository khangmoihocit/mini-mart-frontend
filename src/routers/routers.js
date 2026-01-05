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
        component: lazy(() => import('@pages/Cart/Cart'))
    },
    {
        path: '/product/:id',
        component: lazy(() => import('@pages/DetailProduct/index'))
    },
    {
        path: '/my-orders',
        component: lazy(() => import('@pages/MyOrders/MyOrders'))
    },
    {
        path: '/order/:orderId',
        component: lazy(() => import('@pages/OrderDetail/OrderDetail'))
    },
    {
        path: '/profile',
        component: lazy(() => import('@pages/Profile/Profile'))
    },
];

export default routers;