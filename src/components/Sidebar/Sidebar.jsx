import React, { useContext, useEffect } from 'react';
import styles from './styles.module.scss';
import { SideBarContext } from '@/contexts/SidebarProvider';
import { AiOutlineClose } from 'react-icons/ai';
import classNames from 'classnames';
import Login from '@components/ContentSideBar/Login/Login';
import Compare from '@components/ContentSideBar/Compare/Compare';
import WishList from '@components/ContentSideBar/WishList/WishList';
import Cart from '@components/ContentSideBar/Cart/Cart';
import DetailProduct from '@/components/ContentSideBar/DetailProduct/DetailProduct';

const Sidebar = () => {
    const { container, overlay, sidebar, sliceSideBar, boxIcon } = styles;
    const { isOpen, setIsOpen, type } = useContext(SideBarContext);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleRenderContext = () => {
        switch (type) {
            // case 'login':
            //     return <Login />;
            case 'compare':
                return <Compare />;
            case 'wishList':
                return <WishList />;
            case 'cart':
                return <Cart />;
            case 'detailProduct':
                return <DetailProduct />;
            default:
                return <Cart />;
        }
    };


    return (
        <div className={container}>
            <div
                className={classNames({
                    [overlay]: isOpen
                })}
                onClick={handleToggle}
            ></div>
            <div
                className={classNames(sidebar, {
                    [sliceSideBar]: isOpen
                })}
            >
                {isOpen && (
                    <div className={boxIcon} onClick={handleToggle}>
                        <AiOutlineClose />
                    </div>
                )}

                {handleRenderContext()}
            </div>
        </div>
    );
};

export default Sidebar;
