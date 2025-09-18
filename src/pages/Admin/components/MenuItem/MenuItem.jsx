import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { LuChevronDown } from 'react-icons/lu';
import { AdminContext } from '@/contexts/AdminProvider';
import styles from './styles.module.scss';

const MenuItem = ({ item }) => {
    const {
        menuItemWrapper,
        menuItem,
        active,
        parentActive,
        labelIcon,
        arrow,
        open,
        submenu,
        submenuItem,
        active1
    } = styles;

    const { type, setType } = useContext(AdminContext);
    const [isOpen, setIsOpen] = useState(item.id === type.split('-')[0]);

    const isParentActive = type.startsWith(item.id);

    const hasChildren = item.children && item.children.length > 0;

    const handleClick = () => {
        if (hasChildren) {
            setIsOpen(!isOpen);
        }
        setType(hasChildren ? item.children[0].id : item.id);
    };

    const handleSubItemClick = (e, subItemId) => {
        e.stopPropagation(); // Ngăn sự kiện click lan ra component cha
        setType(subItemId);
    };

    return (
        <div className={menuItemWrapper}>
            <div
                className={classNames(menuItem, {
                    [active]: !hasChildren && type === item.id,
                    [parentActive]: hasChildren && isParentActive
                })}
                onClick={handleClick}
            >
                <div className={labelIcon}>
                    {item.icon}
                    <span>{item.label}</span>
                </div>
                {hasChildren && (
                    <LuChevronDown
                        className={classNames(arrow, { [open]: isOpen })}
                    />
                )}
            </div>

            {hasChildren && isOpen && (
                <div className={submenu}>
                    {item.children.map(child => (
                        <div
                            key={child.id}
                            className={classNames(submenuItem, {
                                [active1]: type === child.id
                            })}
                            onClick={e => handleSubItemClick(e, child.id)}
                        >
                            {child.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuItem;
