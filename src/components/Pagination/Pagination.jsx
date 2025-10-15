import React from 'react';
import styles from './styles.module.scss';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import SelectCommon from '@/components/Pagination/SelectCommon';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    itemsPerPage,
    totalItems,
    onItemsPerPageChange
}) => {
    const {
        pagination,
        paginationInfo,
        paginationControls,
        activePage,
    } = styles;

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        let startPage, endPage;

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
                startPage = 1;
                endPage = maxPagesToShow;
            } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
                startPage = totalPages - maxPagesToShow + 1;
                endPage = totalPages;
            } else {
                startPage = currentPage - Math.floor(maxPagesToShow / 2);
                endPage = currentPage + Math.floor(maxPagesToShow / 2);
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={currentPage === i ? activePage : ''}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className={pagination}>
            <div className={paginationInfo}>
                <span>Hiển thị </span>
                <SelectCommon itemsPerPage={itemsPerPage} onItemsPerPageChange={onItemsPerPageChange} />
                <span> trong số {totalItems} mục</span>
            </div>
            <div className={paginationControls}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <LuChevronLeft />
                </button>
                {renderPageNumbers()}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <LuChevronRight />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
