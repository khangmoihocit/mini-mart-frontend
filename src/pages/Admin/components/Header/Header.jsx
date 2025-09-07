import React from 'react';
import styles from './styles.module.scss';
import { LuSearch } from 'react-icons/lu';
import { IoMoonOutline } from 'react-icons/io5';
import { FaRegBell } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import { LuLayoutGrid } from 'react-icons/lu';
import { IoScan } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';

const Header = () => {
    const {
        containerHeader,
        containerSearch,
        icon,
        listIcon,
        iconItem,
        containerInfo,
        imgAvatar,
        boxName,
        container
    } = styles;

    return (
        <div className={container}>
            <div className={containerHeader}>
                <div className={containerSearch}>
                    <input type='text' placeholder='Tìm kiếm tại đây...' />
                    <LuSearch className={icon} />
                </div>
                <div className={listIcon}>
                    <select name='switchlanguage' id='switch'>
                        <option value='ENG'>ENG</option>
                        <option value='VIE'>VIE</option>
                    </select>
                    <div className={iconItem}>
                        <IoMoonOutline className={icon} />
                    </div>
                    <div className={iconItem}>
                        <FaRegBell className={icon} />
                    </div>
                    <div className={iconItem}>
                        <FiMessageSquare className={icon} />
                    </div>
                    <div className={iconItem}>
                        <IoScan className={icon} />
                    </div>
                    <div className={iconItem}>
                        <LuLayoutGrid className={icon} />
                    </div>
                    <div className={containerInfo}>
                        <div className={imgAvatar}>
                            <img
                                src='https://cdn-icons-png.flaticon.com/512/3781/3781986.png'
                                alt='avatar'
                                width={'36px'}
                                height={'36px'}
                            />
                        </div>
                        <div className={boxName}>
                            <h3>Pham Van Khang</h3>
                            <p>Admin</p>
                        </div>
                    </div>
                    <div>
                        <IoSettingsOutline
                            style={{ width: '36px', height: '26px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
