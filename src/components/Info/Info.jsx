import { dataInfo } from '@components/Info/constants';
import InfoCard from '@components/Info/InfoCard/InfoCard';
import MainLayout from '@components/Layout/Layout';
import React from 'react';
import styles from './styles.module.scss';

const Info = () => {
    const {container} = styles;

    return (
        <div>
            <MainLayout>
                <div className={container}>
                    {dataInfo.map(item=>{
                        return <InfoCard subTitle={item.title} description={item.description} src={item.src}/>;
                    })}
                </div>
            </MainLayout>
        </div>
    );
};

export default Info;