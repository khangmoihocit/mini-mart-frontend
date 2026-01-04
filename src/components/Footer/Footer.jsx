import React from 'react';
import styles from './styles.module.scss';
import dataMenu from '@components/Footer/constants';

const Footer = () => {
    const { container, boxNav } = styles;

    return (
        <>
            <div className={container}>
                <div>
                    <img
                        width={160}
                        height={50}
                        src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/marseille-logo.png'
                        alt='logo'
                    />
                </div>
                <div className={boxNav}>
                    {dataMenu.map(item => {
                        return <div>{item.content}</div>;
                    })}
                </div>
                <div>
                    <p style={{ textAlign: 'center' }}>
                        Guaranteed safe ckeckout
                    </p>
                    <img
                        src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/elementor/thumbs/Icons-123-pzks3go5g30b2zz95xno9hgdw0h3o8xu97fbaqhtb6.png'
                        alt='logo'
                    />
                </div>
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    Copyright © 2025. Created by khangmoihocit.
                </div>
            </div>
        </>
    );
};

export default Footer;
