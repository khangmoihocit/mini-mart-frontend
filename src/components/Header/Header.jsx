import React, { useContext, useEffect, useState } from 'react';
import BoxIcon from '@components/Header/BoxIcon/BoxIcon';
import Menu from '@components/Header/Menu/Menu';
import SearchBar from '@components/Header/SearchBar/SearchBar';
import { dataBoxIcon, dataMenu } from '@components/Header/constants';
import styles from './styles.module.scss';
import Logo from '@/assets/icons/images/Logo-retina.webp';
import { CiHeart } from 'react-icons/ci';
import { TfiReload } from 'react-icons/tfi';
import { PiShoppingCart } from 'react-icons/pi';
import useScrollHandling from '@/hooks/useScrollHandling';
import classNames from 'classnames';
import { SideBarContext } from '@/contexts/SidebarProvider';
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '@/contexts/WishlistProvider';
import { toast } from 'react-toastify';

const Header = () => {
    const {
        container,
        containerBoxIcon,
        containerMenu,
        containerHeader,
        containerBox,
        fixedHeader,
        topHeader,
        boxCart,
        quantity
    } = styles;

    const { scrollPosition } = useScrollHandling();
    const [fixedPosition, setFixedPosition] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const { isOpen, setIsOpen, setType, listProductCart } =
        useContext(SideBarContext);
    const { wishlist } = useContext(WishlistContext);
    const navigate = useNavigate();

    const handleOpenSideBar = type => {
        setIsOpen(true);
        setType(type);
    };

    const handleOpenSearch = () => {
        setIsSearchOpen(true);
    };

    const handleCloseSearch = () => {
        setIsSearchOpen(false);
    };

    useEffect(() => {
        setFixedPosition(scrollPosition > 80 ? true : false);
    }, [scrollPosition]);

    return (
        <div
            className={classNames(container, topHeader, {
                [fixedHeader]: fixedPosition
            })}
        >
            <div className={containerHeader}>
                <div className={containerBox}>
                    <div className={containerBoxIcon}>
                        {dataBoxIcon.map(item => {
                            return (
                                <BoxIcon type={item.type} href={item.href} />
                            );
                        })}
                    </div>
                    <div className={containerMenu}>
                        {dataMenu.slice(0, 3).map((item, index) => {
                            return (
                                <Menu 
                                    key={index}
                                    content={item.content} 
                                    href={item.href}
                                />
                            );
                        })}
                    </div>
                </div>
                <div
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <img
                        src={Logo}
                        alt='Logo'
                        style={{
                            width: '153px',
                            height: '53px'
                        }}
                    />
                </div>
                <div className={containerBox}>
                    <div className={containerMenu}>
                        {dataMenu.slice(3, dataMenu.length).map((item, index) => {
                            return (
                                <Menu 
                                    key={index}
                                    content={item.content} 
                                    href={item.href}
                                    onSearchClick={handleOpenSearch}
                                />
                            );
                        })}
                    </div>
                    <div className={containerBoxIcon}>
                        <TfiReload
                            style={{ fontSize: '20px' }}
                            onClick={() => toast.info('Tinh năng đang phát triển')}
                        />
                        <div className={boxCart}>
                            <CiHeart
                            style={{ fontSize: '27px' }}
                            onClick={() => handleOpenSideBar('wishList')}
                            />
                            <div className={quantity}>
                                {wishlist.length}
                            </div>
                        </div>
                        <div className={boxCart}>
                            <PiShoppingCart
                                style={{ fontSize: '25px' }}
                                onClick={() => handleOpenSideBar('cart')}
                            />
                            <div className={quantity}>
                                {listProductCart.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <SearchBar isOpen={isSearchOpen} onClose={handleCloseSearch} />
        </div>
    );
};

export default Header;
