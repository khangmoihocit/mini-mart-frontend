import { createContext, useContext, useEffect, useState } from 'react';
import { ToastContext } from '@/contexts/ToastProvider';
import productService from '@/apis/productService';
import categoryService from '@/apis/categoryService';

export const OurShopConText = createContext();

export const OurShopProvider = ({ children }) => {
    const sortOptions = [
        { label: 'Mặc định', value: 'newest' },
        { label: 'Mới nhất', value: 'newest' },
        { label: 'Giá: Thấp → Cao', value: 'price_asc' },
        { label: 'Giá: Cao → Thấp', value: 'price_desc' }
    ];

    const showOptions = [
        { label: '8', value: 8 },
        { label: '12', value: 12 },
        { label: '16', value: 16 }
    ];

    const { toast } = useContext(ToastContext);
    const [sortBy, setSortBy] = useState('newest');
    const [pageSize, setPageSize] = useState(8);
    const [isShowGrid, setIsShowGrid] = useState(true);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [categories, setCategories] = useState([]);

    // Filter states
    const [keyword, setKeyword] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const response = await categoryService.getAllCategories();
            if (response.data.code === 0 || response.data.code === 1000) {
                setCategories(response.data.result);
            }
        } catch (error) {
            toast.error('Không thể tải danh mục');
        }
    };

    // Fetch products with advanced search
    const fetchProducts = async (page = 1, isLoadMore = false) => {
        try {
            const isLoad = isLoadMore ? setIsLoadMore : setIsLoading;
            isLoad(true);

            const params = {
                keyword: keyword || undefined,
                categoryId: categoryId || undefined,
                minPrice: minPrice || undefined,
                maxPrice: maxPrice || undefined,
                sortBy,
                pageNo: page,
                pageSize
            };

            // Remove undefined values
            Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

            const response = await productService.searchAdvanced(params);

            if (response.data.code === 1000 || response.data.code === 0) {
                const { content, totalPages: total, totalElements } = response.data.result;
                
                if (isLoadMore) {
                    setProducts(prev => [...prev, ...content]);
                } else {
                    setProducts(content);
                }
                
                setTotalPages(total);
                setTotalItems(totalElements);
                setPageNo(page);
            }
            isLoad(false);
        } catch (error) {
            toast.error('Không thể tải sản phẩm');
            isLoad(false);
        }
    };

    // Load more products
    const handleLoadMore = () => {
        if (pageNo < totalPages) {
            fetchProducts(pageNo + 1, true);
        }
    };

    // Filter handler
    const handleFilter = (filters) => {
        setKeyword(filters.keyword || '');
        setCategoryId(filters.categoryId || '');
        setMinPrice(filters.minPrice || null);
        setMaxPrice(filters.maxPrice || null);
        setPageNo(1);
    };

    // Clear filters
    const clearFilters = () => {
        setKeyword('');
        setCategoryId('');
        setMinPrice(null);
        setMaxPrice(null);
        setPageNo(1);
    };

    const values = {
        sortOptions,
        showOptions,
        setSortBy,
        setPageSize,
        setIsShowGrid,
        products,
        isShowGrid,
        isLoading,
        handleLoadMore,
        totalPages,
        totalItems,
        isLoadMore,
        pageNo,
        // Filter values
        keyword,
        setKeyword,
        categoryId,
        setCategoryId,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        handleFilter,
        clearFilters,
        fetchProducts,
        categories
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts(1);
    }, [sortBy, pageSize, keyword, categoryId, minPrice, maxPrice]);

    return (
        <OurShopConText.Provider value={values}>
            {children}
        </OurShopConText.Provider>
    );
};
