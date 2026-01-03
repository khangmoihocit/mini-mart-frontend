import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import useTranslateXImage from '@/hooks/useTranslateXImage';

const SaleHomePage = () => {
    const { container, title, desc, boxBtn, boxImage, boxContent } = styles;
    const { translateXPosition } = useTranslateXImage();

    return (
        <div className={container}>
            <div
                className={boxImage}
                style={{
                    transform: `translateX(${translateXPosition}px)`,
                    transition: 'transform 0.6s ease'
                }}
            >
                <img
                    src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image_1.jpeg'
                    alt=''
                />
            </div>
            <div className={boxContent}>
                <h2 className={title}>Ưu đãi trong năm</h2>
                <p className={desc}>
                    Khám phá bộ sưu tập mùa xuân mới nhất của chúng tôi với các
                    thiết kế tươi sáng và phong cách để làm mới tủ quần áo của bạn.
                </p>
                <div className={boxBtn}>
                    <Button content={'Tìm hiểu thêm'} isPrimary={false} onClick={() => window.location.href = '/shop'} />
                </div>
            </div>
            <div
                className={boxImage}
                style={{
                    transform: `translateX(-${translateXPosition}px)`,
                    transition: 'transform 0.6s ease'
                }}
            >
                <img
                    src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image_2.jpeg'
                    alt=''
                />
            </div>
        </div>
    );
};

export default SaleHomePage;
