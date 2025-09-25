import React, { useContext } from 'react';
import styles from './styles.module.scss';
import logo from '@icons/svgs/logo.svg';
import { BiArrowToLeft } from 'react-icons/bi';
import { AdminContext } from '@/contexts/AdminProvider';
import classNames from 'classnames';
import { sidebarMenu } from '../../../../constants/dataSidebar.jsx';
import MenuItem from '../MenuItem/MenuItem';

const Sidebar = () => {
    const {
        sectionTop,
        icon,
        iconToggle,
        containerSidebarMain,
        sliceSideBar,
        sidebarContent, 
        sectionTitle
    } = styles;
    const { isOpenSidebar, toggleSidebar } = useContext(AdminContext);

    return (
        <div
            className={classNames(containerSidebarMain, {
                [sliceSideBar]: !isOpenSidebar
            })}
        >
            <div className={sectionTop}>
                <a href='/admin'>
                    <img src={logo} alt='logo'/>
                </a>
                <div className={iconToggle}>
                    {isOpenSidebar && (
                        <BiArrowToLeft
                            className={icon}
                            onClick={toggleSidebar}
                        />
                    )}
                </div>
            </div>

            
            <div className={sidebarContent}>
                {sidebarMenu.map((section, index) => (
                    <div key={index}>
                        <h3 className={sectionTitle}>{section.title}</h3>
                        {section.items.map(item => (
                            <MenuItem key={item.id} item={item} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;