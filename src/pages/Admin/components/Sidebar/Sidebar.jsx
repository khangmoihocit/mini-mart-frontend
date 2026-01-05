import React, { useContext } from 'react';
import styles from './styles.module.scss';
// import logo from '@icons/svgs/logo.svg';
import { BiArrowToLeft } from 'react-icons/bi';
import { AdminContext } from '@/contexts/AdminProvider';
import classNames from 'classnames';
import { sidebarMenu } from '../../../../constants/dataSidebar.jsx';
import MenuItem from '../MenuItem/MenuItem';
import Button from '@/components/Button/Button';
import { toast } from 'react-toastify';
import { formatErrorMessage } from '@/utils/helpers';
import authService from '@/apis/authService';

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
    const { isOpenSidebar, setIsOpenSidebar } = useContext(AdminContext);

    const toggleSidebar = () => {
        setIsOpenSidebar(prev => !prev);
    }

    const generateData = async () => {
        try{
            const response = await authService.fakeData();
            toast.success(response.data.message);
            window.location.reload();
        }catch(err){
            toast.error(formatErrorMessage(err));
        }
    }

    return (
        <div
            className={classNames(containerSidebarMain, {
                [sliceSideBar]: !isOpenSidebar
            })}
        >
            <div className={sectionTop}>
                <a href='/admin'>
                    {/* <img src={logo} alt='logo'/> */}
                    Shop quần áo
                </a>
                <Button onClick={generateData} content={'Tạo nhanh 100 sản phẩm'}/>
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