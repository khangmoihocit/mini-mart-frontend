import HeaderSideBar from '@components/ContentSideBar/components/HeaderSideBar/HeaderSideBar';
import React from 'react';
import { TfiReload } from 'react-icons/tfi';
import styles from './styles.module.scss';
import ItemProduct from '@components/ContentSideBar/components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';

const Compare = () => {
    const { container, boxContent } = styles;

    return (
        <div className={container}>
            <div className={boxContent}>
                <HeaderSideBar
                    icon={<TfiReload style={{ fontSize: '20px' }} />}
                    title={'COMPARE'}
                />
                <ItemProduct />
            </div>
            <div style={{ width: '100%' }}>
                <Button content={'VIEW COMPARE'} />
            </div>
        </div>
    );
};

export default Compare;
