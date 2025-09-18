import React from 'react';
import styles from './styles.module.scss';

const HeaderMainContent = ({title, navigate}) => {

    const {header, titleHeader, breadcrumbs} = styles;

    return (
        <>
            <div className={header}>
                <h2 className={titleHeader}>{title}</h2>
                <div className={breadcrumbs}>
                    {navigate}
                </div>
            </div>
        </>
    );
};

export default HeaderMainContent;