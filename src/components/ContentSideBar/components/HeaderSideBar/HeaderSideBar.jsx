import React from 'react';
import styles from './styles.module.scss';

const HeaderSideBar = ({ icon, title }) => {
    const { container } = styles;

    return (
        <div className={container}>
            {icon}
            <div>{title}</div>
        </div>
    );
};

export default HeaderSideBar;
