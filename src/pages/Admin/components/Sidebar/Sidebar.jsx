import React, { useContext } from 'react';
import styles from './styles.module.scss';
import logo from '@icons/images/logo.png';
import { BiArrowToLeft } from 'react-icons/bi';
import { BiArrowToRight } from 'react-icons/bi';
import { AdminContext } from '@/contexts/AdminProvider';
import classNames from 'classnames';

const Sidebar = () => {
    const { sectionTop, icon, iconToggle, containerSidebarMain, sliceSideBar } = styles;
    const { isOpenSidebar, setIsOpenSidebar } = useContext(AdminContext);

    const handleToggleSidebar = () => {
        setIsOpenSidebar(!isOpenSidebar);
    };

    return (
        <div className={classNames(containerSidebarMain, {[sliceSideBar]: !isOpenSidebar})}>
            <div className={sectionTop}>
                <a href='/admin'>
                    <img src={logo} alt='logo' width={154} height={52} />
                </a>
                <div className={iconToggle}>
                    {isOpenSidebar && (
                        <BiArrowToLeft
                            className={icon}
                            onClick={handleToggleSidebar}
                        />
                    )}
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default Sidebar;
