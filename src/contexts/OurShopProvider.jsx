import { createContext, useContext, useEffect, useState } from 'react';
import { ToastContext } from '@/contexts/ToastProvider';

export const OurShopConText = createContext();

export const OurShopProvider = ({ children }) => {
    const sortOptions = [
        { label: 'Default sorting', value: '0' },
        { label: 'Sort by popularity ', value: '1' },
        { label: 'Sort by average rating ', value: '2' },
        { label: 'Sort by latest ', value: '3' },
        { label: 'Sort by price: low to high ', value: '4' },
        { label: 'Sort by price: high to low ', value: '5' }
    ];

    const showOptions = [
        { label: '8', value: '8' },
        { label: '12', value: '12' },
        { label: 'All', value: 'all' }
    ];

    const { toast } = useContext(ToastContext);
    const [sortId, setSortId] = useState('0');
    const [showId, setShowId] = useState('8');
    const [isShowGrid, setIsShowGrid] = useState(true);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    //set products thêm các sản phẩm theo số trang
    const handleLoadMore = () => {
        const query = { sortType: sortId, page: +page + 1, limit: showId };

        setIsLoadMore(true);
        // getProducts(query)
        //     .then(response => {
        //         //set lại list lấy cả giá trị trước đó
        //         setProducts(prev => {
        //             return [...prev, ...response.contents];
        //         });
        //         setPage(+response.page);
        //         setTotal(response.total);
        //         setIsLoadMore(false);
        //     })
        //     .catch(error => {
        //         toast.error(error);
        //         setIsLoadMore(false);
        //     });
    };

    const values = {
        sortOptions,
        showOptions,
        setSortId,
        setShowId,
        setIsShowGrid,
        products,
        isShowGrid,
        isLoading,
        handleLoadMore,
        total,
        isLoadMore
    };

    useEffect(() => {
        setPage(1);
        const query = {
            sortType: sortId,
            page: 1,
            limit: showId
        };
        setIsLoading(true);
        // getProducts(query)
        //     .then(response => {
        //         setProducts(response.contents);
        //         setIsLoading(false);
        //         setTotal(response.total);
        //     })
        //     .catch(error => {
        //         toast.error(error);
        //         setIsLoading(false);
        //     });
    }, [sortId, showId]);

    return (
        <OurShopConText.Provider value={values}>
            {children}
        </OurShopConText.Provider>
    );
};
