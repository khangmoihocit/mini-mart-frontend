import {
    LuLayoutDashboard,
    LuShoppingCart,
    LuClipboardList,
    LuTags,
    LuTicket,
    LuTrendingUp,
    LuSettings,
    LuShieldCheck,
    LuStar
} from 'react-icons/lu';

import { CiUser } from 'react-icons/ci';

export const sidebarMenu = [
    {
        title: 'TỔNG QUAN',
        items: [
            {
                id: 'dashboard',
                label: 'Bảng điều khiển',
                icon: <LuLayoutDashboard />
            }
        ]
    },
    {
        title: 'BÁN HÀNG',
        items: [
            {
                id: 'order',
                label: 'Quản lý Đơn hàng',
                icon: <LuClipboardList />,
                children: [
                    {
                        id: 'order-list',
                        label: 'Danh sách đơn hàng'
                    }
                ]
            },
            {
                id: 'product',
                label: 'Quản lý Sản phẩm',
                icon: <LuShoppingCart />,
                children: [
                    {
                        id: 'product-list',
                        label: 'Danh sách sản phẩm'
                    },
                    { id: 'product-add', label: 'Thêm sản phẩm' }
                ]
            },
            {
                id: 'category',
                label: 'Quản lý Danh mục',
                icon: <LuTags />,
                children: [
                    {
                        id: 'category-list',
                        label: 'Danh sách danh mục'
                    },
                    { id: 'category-add', label: 'Thêm danh mục' }
                ]
            }
        ]
    },
    {
        title: 'KHÁCH HÀNG',
        items: [
            {
                id: 'user',
                label: 'Quản lý Người dùng',
                icon: <CiUser />,
                children: [
                    {
                        id: 'user-list',
                        label: 'Danh sách người dùng'
                    }
                ]
            },
            {
                id: 'role',
                label: 'Quản lý Vai trò',
                icon: <LuShieldCheck />,
                children: [
                    {
                        id: 'role-list',
                        label: 'Danh sách vai trò'
                    }
                ]
            },
            {
                id: 'review',
                label: 'Quản lý Đánh giá',
                icon: <LuStar />
            }
        ]
    },
    {
        title: 'MARKETING',
        items: [
            {
                id: 'coupon',
                label: 'Quản lý Mã giảm giá',
                icon: <LuTicket />,
                children: [
                    {
                        id: 'coupon-list',
                        label: 'Danh sách mã giảm giá'
                    },
                    {
                        id: 'coupon-add',
                        label: 'Tạo mã mới'
                    }
                ]
            }
        ]
    },
    {
        title: 'HỆ THỐNG',
        items: [
            {
                id: 'report',
                label: 'Báo cáo & Thống kê',
                icon: <LuTrendingUp /> // Sử dụng icon mới tại đây
            },
            {
                id: 'setting',
                label: 'Cài đặt',
                icon: <LuSettings />
            }
        ]
    }
];
