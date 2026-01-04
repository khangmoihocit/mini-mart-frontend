import React, { useContext, useState } from 'react';
import { TfiLayoutGrid4 } from 'react-icons/tfi';
import { CiCircleList } from 'react-icons/ci';
import styles from '../styles.module.scss';
import BoxIcon from '@components/Header/BoxIcon/BoxIcon';
import classNames from 'classnames';
import { OurShopConText } from '@/contexts/OurShopProvider';
import SelectBox from '@/pages/OurShop/components/SelectBox';
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const Filter = () => {
    const { containerFilter, boxIcon, boxLeft, selectBox, sort, show } = styles;

    const { 
        showOptions, 
        sortOptions, 
        setSortBy, 
        setPageSize, 
        setIsShowGrid,
        keyword,
        setKeyword,
        categoryId,
        setCategoryId,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        categories,
        clearFilters
    } = useContext(OurShopConText);

    const [localMinPrice, setLocalMinPrice] = useState(minPrice || '');
    const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice || '');
    const [showFilters, setShowFilters] = useState(false);

    const getValueSelect = (value, type) => {
        if (type === 'sort') {
            setSortBy(value);
        } else if (type === 'show') {
            setPageSize(parseInt(value));
        }
    };

    const handleGetShowGrid = type => {
        if(type === 'grid'){
            setIsShowGrid(true);
        }else{
            setIsShowGrid(false);
        }
    };

    const handleApplyFilters = () => {
        setMinPrice(localMinPrice ? parseInt(localMinPrice) : null);
        setMaxPrice(localMaxPrice ? parseInt(localMaxPrice) : null);
    };

    const handleClearFilters = () => {
        setKeyword('');
        setCategoryId('');
        setLocalMinPrice('');
        setLocalMaxPrice('');
        clearFilters();
    };

    return (
        <div style={{ width: '100%' }}>
            {/* Advanced Filters Section */}
            <div style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '20px', 
                borderRadius: '4px',
                marginBottom: '20px'
            }}>
                
            </div>

            {/* Sort and View Options */}
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
                {/* Search Keyword */}
                    <input
                        type="text"
                        placeholder="Tên sản phẩm..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    />
                </div>
                <div className={boxLeft}>
                    {/* Category Filter */}
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px'
                        }}
                    >
                        <option value="">Tất cả danh mục</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={boxLeft}>
                    {/* Price Range Filter */}
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="number"
                            placeholder="Giá tối thiểu"
                            value={localMinPrice}
                            onChange={(e) => {
                                setLocalMinPrice(e.target.value);
                            }}
                            style={{
                                flex: 1,
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        />
                        <span style={{ color: '#666' }}>-</span>
                        <input
                            type="number"
                            placeholder="Giá tối đa"
                            value={localMaxPrice}
                            onChange={(e) => setLocalMaxPrice(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '8px 12px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                fontSize: '14px'
                            }}
                        />
                        {/* Filter Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={handleApplyFilters}
                        style={{
                            flex: 1,
                            padding: '10px',
                            backgroundColor: '#ff6b6b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        <IoIosSearch />
                    </button>
                    <button
                        onClick={handleClearFilters}
                        style={{
                            flex: 1,
                            padding: '10px',
                            backgroundColor: '#f0f0f0',
                            color: '#333',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        <IoMdClose />
                    </button>
                    </div>
                </div>
                </div>
                <div className={boxLeft}>
                    <div style={{ fontSize: '14px', color: '#555' }}>Hiển thị </div>
                    <SelectBox
                        options={showOptions}
                        getValue={getValueSelect}
                        type={'show'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Filter;
