import React, { useContext } from 'react';
import { TfiLayoutGrid4 } from 'react-icons/tfi';
import { CiCircleList } from 'react-icons/ci';
import styles from '../styles.module.scss';
import BoxIcon from '@components/Header/BoxIcon/BoxIcon';
import classNames from 'classnames';
import { OurShopConText } from '@/contexts/OurShopProvider';
import SelectBox from '@/pages/OurShop/components/SelectBox';

const Filter = () => {
    const { containerFilter, boxIcon, boxLeft, selectBox, sort, show } = styles;

    const { showOptions, sortOptions, setSortId, setShowId, setIsShowGrid } =
        useContext(OurShopConText);

    const getValueSelect = (value, type) => {
        if (type === 'sort') {
            setSortId(value);
        } else if (type === 'show') {
            setShowId(value);
        }
    };

    const handleGetShowGrid = type => {
        if(type === 'grid'){
            setIsShowGrid(true);
        }else{
            setIsShowGrid(false);
        }
    };

    return (
        <div className={containerFilter}>
            <div className={boxLeft}>
                <SelectBox
                    options={sortOptions}
                    getValue={getValueSelect}
                    type={'sort'}
                />

                <div className={boxIcon}>
                    <TfiLayoutGrid4
                        style={{ fontSize: '20px', cursor: 'pointer' }}
                        onClick={() => handleGetShowGrid('grid')}
                    />
                    <div
                        style={{
                            height: '20px',
                            width: '1px',
                            backgroundColor: '#e1e1e1'
                        }}
                    />
                    <CiCircleList
                        style={{ fontSize: '20px', cursor: 'pointer' }}
                        onClick={() => handleGetShowGrid('list')}
                    />
                </div>
            </div>
            <div className={boxLeft}>
                <div style={{ fontSize: '14px', color: '#555' }}>Show </div>
                <SelectBox
                    options={showOptions}
                    getValue={getValueSelect}
                    type={'show'}
                />
            </div>
        </div>
    );
};

export default Filter;
