// import { getDetailProduct, getRelatedProduct } from '@/apis/productsService';
import InformationProduct from '@/pages/DetailProduct/components/Infomation';
import ReviewProduct from '@/pages/DetailProduct/components/Review';
import { formatErrorMessage } from '@/utils/helpers';
import AccordionMenu from '@components/AccordionMenu';
import Button from '@components/Button/Button';
import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';
import PaymentMethods from '@components/PaymentMethods/PaymentMethods';
import SliderCommon from '@components/SliderCommon/SliderCommon';
import cls from 'classnames';
import { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import { TfiReload } from 'react-icons/tfi';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { ToastContext } from '@/contexts/ToastProvider';
import Cookies from 'js-cookie';
import productService from '@/apis/productService';
import cartService from '@/apis/cartService';

const INCREMENT = 'increment';
const DECREMENT = 'decrement';

function DetailProduct() {
    const {
        container,
        navigateSection,
        contentSection,
        price,
        imageBox,
        infoBox,
        description,
        boxSize,
        size,
        titleSize,
        functionInfo,
        boxBtn,
        incrementAmount,
        orSection,
        addFunc,
        info,
        active,
        clear,
        activeDisabledBtn,
        loading,
        emptyData
    } = styles;

    const [menuSelected, setMenuSelected] = useState(1);
    const [sizeSelected, setSizeSelected] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState();
    const [relatedData, setRelatedData] = useState([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const param = useParams();
    const navigate = useNavigate();
    const { setIsOpen, setType, handleGetListProducCart } =
        useContext(SideBarContext);
    const { toast } = useContext(ToastContext);
    const userId = Cookies.get('userId');
    const [isLoadingBtn, setIsLoadingBtn] = useState(false);
    const [isLoadingBtnBuyNow, setIsLoadingBtnBuyNow] = useState(false);

    const dataAccordionMenu = [
        {
            id: 1,
            titleMenu: 'THÔNG TIN SẢN PHẨM',
            content: <InformationProduct />
        },
        {
            id: 2,
            titleMenu: 'ĐÁNH GIÁ (0)',
            content: <ReviewProduct />
        }
    ];

    const baseUrlImg = 'http://localhost:8081/images/';

    const handleRenderZoomImage = (src) => {
        return (
            <img
                src={`${baseUrlImg}${src}`}
                alt="Product"
                style={{ width: '100%', height: '350px', objectFit: 'cover' }}
            />
        );
    };

    const handleSetMenuSelected = (id) => {
        setMenuSelected(id);
    };

    const handleSelectedSize = (size) => {
        setSizeSelected(size);
    };

    const handleClearSizeSeleted = () => {
        setSizeSelected('');
    };

    const handleSetQuantity = (type) => {
        if (quantity < 1) return;

        setQuantity((prev) =>
            type === INCREMENT ? (prev += 1) : quantity === 1 ? 1 : (prev -= 1)
        );
    };

    const fetchDataDetail = async (id) => {
        setIsLoading(true);
        try {
            const data = await productService.getById(id);

            setData(data.data.result);
            setIsLoading(false);
        } catch (error) {
            toast.error('Có lỗi khi tải dữ liệu');
            setData();
            setIsLoading(false);
        }
    };

    const fetchDataRelatedProduct = async (id) => {
        setIsLoading(true);
        try {
            const data = await productService.getByCategoryId(id);
            setRelatedData(data);
            setIsLoading(false);
        } catch (error) {
            setRelatedData([]);
            toast.error('Có lỗi khi tải dữ liệu');
            setIsLoading(false);
        }
    };

    const handleAdd = async () => {
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
            return;
        }

        if (data?.sizes && data.sizes.length > 0 && !sizeSelected) {
            toast.warning('Vui lòng chọn size sản phẩm');
            return;
        }

        try {
            setIsLoadingBtn(true);
            
            let productSizeId = null;
            if (sizeSelected && data?.sizes) {
                const selectedSize = data.sizes.find(s => s.sizeName === sizeSelected);
                if (selectedSize) {
                    productSizeId = selectedSize.id;
                }
            }

            const cartData = {
                productId: param.id,
                quantity: quantity,
                ...(productSizeId && { productSizeId })
            };

            await cartService.addToCart(cartData);
            toast.success('Thêm sản phẩm vào giỏ hàng thành công');
            setIsOpen(true);
            setType('cart');
            handleGetListProducCart(userId, 'cart');
        } catch (error) {
            const errorMessage = formatErrorMessage(error);
            toast.error(errorMessage);
        } finally {
            setIsLoadingBtn(false);
        }
    };

    const handleBuyNow = async () => {
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Vui lòng đăng nhập để mua hàng');
            return;
        }

        if (data?.sizes && data.sizes.length > 0 && !sizeSelected) {
            toast.warning('Vui lòng chọn size sản phẩm');
            return;
        }

        try {
            setIsLoadingBtnBuyNow(true);
            
            let productSizeId = null;
            if (sizeSelected && data?.sizes) {
                const selectedSize = data.sizes.find(s => s.sizeName === sizeSelected);
                if (selectedSize) {
                    productSizeId = selectedSize.id;
                }
            }

            const cartData = {
                productId: param.id,
                quantity: quantity,
                ...(productSizeId && { productSizeId })
            };

            await cartService.addToCart(cartData);
            toast.success('Đã thêm sản phẩm vào giỏ hàng');
            navigate('/cart');
        } catch (error) {
            const errorMessage = formatErrorMessage(error);
            toast.error(errorMessage);
        } finally {
            setIsLoadingBtnBuyNow(false);
        }
    };

    useEffect(() => {
        if (param.id) {
            fetchDataDetail(param.id);
            fetchDataRelatedProduct(param.id);
        }
    }, [param]);

    return (
        <div>
            <MyHeader />

            <div className={container}>
                <MainLayout>
                    <div className={navigateSection}>
                        <div>Trang chủ {'>'} Nam</div>
                        <div className='' style={{ cursor: 'pointer' }}>
                            {'<'} Quay lại trang trước{' '}
                        </div>
                    </div>

                    {isLoading ? (
                        <div className={loading}>
                            <LoadingTextCommon />
                        </div>
                    ) : (
                        <>
                            {!data ? (
                                <div className={emptyData}>
                                    <p>Không có kết quả</p>
                                    <div>
                                        <Button
                                            content={'Quay lại cửa hàng'}
                                            onClick={() => navigate('/shop')}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className={contentSection}>
                                    <div className={imageBox}>
                                        {/* Main Image */}
                                        <div className={styles.mainImageContainer}>
                                            <img
                                                src={`${baseUrlImg}${data?.images[selectedImageIndex]?.imageUrl}`}
                                                alt={data?.name}
                                                className={styles.mainImage}
                                            />
                                        </div>
                                        
                                        {/* Thumbnails */}
                                        <div className={styles.thumbnailsContainer}>
                                            {data?.images.map((img, index) => (
                                                <div
                                                    key={index}
                                                    className={`${styles.thumbnail} ${selectedImageIndex === index ? styles.activeThumbnail : ''}`}
                                                    onClick={() => setSelectedImageIndex(index)}
                                                >
                                                    <img
                                                        src={`${baseUrlImg}${img.imageUrl}`}
                                                        alt={`${data?.name} ${index + 1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={infoBox}>
                                        <h1>{data?.name}</h1>
                                        <p className={price}>{data?.price}đ</p>
                                        <p className={description}>
                                            {data?.description}
                                        </p>

                                        <p className={titleSize}>
                                            Size {sizeSelected}
                                        </p>
                                        <div className={boxSize}>
                                            {data?.sizes.map(
                                                (itemSize, index) => {
                                                    return (
                                                        <div
                                                            className={cls(
                                                                size,
                                                                {
                                                                    [active]:
                                                                        sizeSelected ===
                                                                        itemSize.sizeName
                                                                }
                                                            )}
                                                            key={index}
                                                            onClick={() =>
                                                                handleSelectedSize(
                                                                    itemSize.sizeName
                                                                )
                                                            }
                                                        >
                                                            {itemSize.sizeName}
                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>

                                        {sizeSelected && (
                                            <p
                                                className={clear}
                                                onClick={handleClearSizeSeleted}
                                            >
                                                clear
                                            </p>
                                        )}

                                        <div className={functionInfo}>
                                            <div className={incrementAmount}>
                                                <div
                                                    onClick={() =>
                                                        handleSetQuantity(
                                                            DECREMENT
                                                        )
                                                    }
                                                >
                                                    -
                                                </div>
                                                <div>{quantity}</div>
                                                <div
                                                    onClick={() =>
                                                        handleSetQuantity(
                                                            INCREMENT
                                                        )
                                                    }
                                                >
                                                    +
                                                </div>
                                            </div>

                                            <div className={boxBtn}>
                                                <Button
                                                    content={
                                                        isLoadingBtn ? (
                                                            <LoadingTextCommon />
                                                        ) : (
                                                            'Thêm vào giỏ hàng'
                                                        )
                                                    }
                                                    customClassname={
                                                        !sizeSelected &&
                                                        activeDisabledBtn
                                                    }
                                                    onClick={handleAdd}
                                                />
                                            </div>
                                        </div>

                                        <div className={orSection}>
                                            <div></div>
                                            <span>OR</span>
                                            <div></div>
                                        </div>

                                        <div>
                                            <Button
                                                content={
                                                    isLoadingBtnBuyNow ? (
                                                        <LoadingTextCommon />
                                                    ) : (
                                                        'Mua ngay'
                                                    )
                                                }
                                                customClassname={
                                                    !sizeSelected &&
                                                    activeDisabledBtn
                                                }
                                                onClick={handleBuyNow}
                                            />
                                        </div>

                                        <div className={addFunc}>
                                            <div>
                                                <CiHeart />
                                            </div>

                                            <div>
                                                <TfiReload />
                                            </div>
                                        </div>

                                        <div>
                                            <PaymentMethods />
                                        </div>

                                        <div className={info}>
                                            <div>
                                                Thương hiệu: <span>Thương hiệu 03</span>
                                            </div>

                                            <div>
                                                SKU: <span>87654</span>
                                            </div>

                                            <div>
                                                Danh mục: <span>Nam</span>
                                            </div>
                                        </div>

                                        {dataAccordionMenu.map(
                                            (item, index) => (
                                                <AccordionMenu
                                                    titleMenu={item.titleMenu}
                                                    contentJsx={item.content}
                                                    key={index}
                                                    onClick={() =>
                                                        handleSetMenuSelected(
                                                            item.id
                                                        )
                                                    }
                                                    isSelected={
                                                        menuSelected === item.id
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {relatedData.length ? (
                        <div>
                            <h2>Related products</h2>

                            <SliderCommon
                                data={relatedData}
                                isProductItem
                                showItem={4}
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                </MainLayout>
            </div>

            <MyFooter />
        </div>
    );
}

export default DetailProduct;
