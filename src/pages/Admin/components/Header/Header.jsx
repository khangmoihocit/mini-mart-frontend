import React, { useCallback, useContext, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { LuSearch } from 'react-icons/lu';
import { IoMoonOutline } from 'react-icons/io5';
import { FaRegBell } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import { LuLayoutGrid } from 'react-icons/lu';
import { IoScan } from 'react-icons/io5';
import { IoSettingsOutline } from 'react-icons/io5';
import LogoVN from '@icons/svgs/vn.svg';
import LogoENG from '@icons/svgs/eng.svg';
import LogoJP from '@icons/svgs/japan.svg';
import dataLanguage from '@/constants/dataLanguage';
import MenuLanguage from '@/pages/Admin/components/MenuLanguage/MenuLanguage';
import { AdminContext } from '@/contexts/AdminProvider';
import { BiArrowToRight } from 'react-icons/bi';
import classNames from 'classnames';
import userService from '@/apis/userService';
import { formatErrorMessage } from '@/utils/helpers';

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
        container,
        boxLanguage,
        menuLanguage,
        containerLanguage,
        wrapLanguage,
        iconToggle,
        sliceContainer,
        sliceContainerSearch
    } = styles;

    const [userCurrent, setUserCurrent] = useState({});
    const [isShowLanguage, setIsShowLanguage] = useState(false);
    const [typeLanguage, setTypeLanguage] = useState('VN');
    const [language, setLanguage] = useState({ src: LogoVN, content: 'VN' });
    const { isOpenSidebar, toggleSidebar } = useContext(AdminContext);

    const getMyInfo = useCallback(async () => {
        try {
            const response = await userService.getMyInfo();
            setUserCurrent(response.data.result);
        } catch (error) {
            console.log(formatErrorMessage(error));
        }
    }, []);

    const getNameRole = (user)=>{
        let s = '';
        user.roles.forEach(item => {
            s += item.name + ' ';
        });
        return s;
    }

    useEffect(() => {
        getMyInfo();
    }, [getMyInfo]);

    useEffect(() => {
        switch (typeLanguage) {
            case 'VN':
                setLanguage({ src: LogoVN, content: 'VN' });
                break;
            case 'ENG':
                setLanguage({ src: LogoENG, content: 'ENG' });
                break;
            case 'JP':
                setLanguage({ src: LogoJP, content: 'JP' });
                break;
            default:
                setLanguage({ src: LogoVN, content: 'VN' });
        }
    }, [typeLanguage]);

    return (
        <div
            className={classNames(container, {
                [sliceContainer]: !isOpenSidebar
            })}
        >
            <div className={containerHeader}>
                {!isOpenSidebar && (
                    <div className={iconToggle}>
                        <BiArrowToRight
                            className={icon}
                            onClick={toggleSidebar}
                        />
                    </div>
                )}
                <div
                    className={classNames(containerSearch, {
                        [sliceContainerSearch]: !isOpenSidebar
                    })}
                >
                    <input type='text' placeholder='Tìm kiếm tại đây...' />
                    <LuSearch className={icon} />
                </div>
                <div className={listIcon}>
                    <div
                        className={containerLanguage}
                        onMouseEnter={() => setIsShowLanguage(!isShowLanguage)}
                        onMouseLeave={() => setIsShowLanguage(!isShowLanguage)}
                    >
                        <div className={boxLanguage}>
                            <img src={language.src} alt='icon vn' />
                            <p>{language.content}</p>
                        </div>
                        {isShowLanguage && (
                            <div className={menuLanguage}>
                                <b>Languages</b>
                                <div className={wrapLanguage}>
                                    {dataLanguage.map(item => (
                                        <MenuLanguage
                                            key={item.value}
                                            setTypeLanguage={setTypeLanguage}
                                            value={item.value}
                                            src={item.src}
                                            content={item.content}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
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
                            <h3>{userCurrent ? userCurrent.fullName : 'Khang default'}</h3>
                            <p>{userCurrent && userCurrent.roles ? getNameRole(userCurrent) : 'Role default'}</p>
                        </div>
                    </div>
                    <div>
                        <IoSettingsOutline
                            style={{
                                width: '36px',
                                height: '26px',
                                cursor: 'pointer'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
