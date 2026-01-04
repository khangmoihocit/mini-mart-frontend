import React, { useContext, useState } from 'react';
import styles from '../styles.module.scss';
import { SideBarContext } from '@/contexts/SidebarProvider';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '@/contexts/StoreProvider';

const Menu = ({ content, href }) => {
    const { menu, subMenu } = styles;
    const [isShowSubMenu, setIsShowSubMenu] = useState(false);
    const { setIsOpen, setType } = useContext(SideBarContext);
    const { userInfo, setUserInfo } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleClickShowLogin = () => {
        if (content === 'Đăng nhập' && !userInfo) {
            navigate('/login');
        }

        if (content === 'Sản phẩm') {
            navigate('/shop');
        }

        if (content === 'Trang chủ') {
            navigate('/');
        }
    };

    const handleRenderText = content => {
        if (content === 'Đăng nhập' && userInfo) {
            return `Xin chào, ${userInfo?.fullName || 'Người ẩn danh chưa điền tên khi đăng ý à'}`;
        } else {
            return content;
        }
    };

    const handleHover = () => {
        if (content === 'Đăng nhập' && userInfo) {
            setIsShowSubMenu(true);
        }
    };

    const handleLogOut = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        Cookies.remove('userId');

        setIsShowSubMenu(false);
        setUserInfo(null);
        window.location.reload();
    };

    return (
        <div
            className={menu}
            onClick={handleClickShowLogin}
            onMouseEnter={handleHover}
        >
            {handleRenderText(content)}
            {isShowSubMenu && (
                <div
                    onMouseLeave={() => setIsShowSubMenu(false)}
                    className={subMenu}
                    onClick={handleLogOut}
                >
                    LOG OUT
                </div>
            )}
        </div>
    );
};

export default Menu;
