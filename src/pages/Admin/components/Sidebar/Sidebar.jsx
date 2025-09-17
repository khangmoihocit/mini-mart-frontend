import React, { useContext } from 'react';
import styles from './styles.module.scss';
import logo from '@icons/images/logo.png';
import { BiArrowToLeft } from 'react-icons/bi';
import { BiArrowToRight } from 'react-icons/bi';
import { AdminContext } from '@/contexts/AdminProvider';

const Sidebar = () => {
    const { sectionTop, icon , iconToggle} = styles;
    const { isOpenSidebar } = useContext(AdminContext);

    return (
        <>
            <div className={sectionTop}>
                <a href="/admin"><img src={logo} alt='logo' width={154} height={52} /></a>
                <div className={iconToggle}>
                    {isOpenSidebar ? (
                        <BiArrowToLeft className={icon} />
                    ) : (
                        <BiArrowToRight className={icon} />
                    )}
                </div>
            </div>
            <div></div>
        </>
    );
};

export default Sidebar;
