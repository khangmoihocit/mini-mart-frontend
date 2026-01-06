import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import './styles.css';
import ProductItem from '@components/ProductItem/ProductItem';

function SliderCommon({ data, isProductItem = false, showItem = 1 }) {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: showItem,
        slidesToScroll: 1,
        nextArrow: <MdArrowForwardIos />,
        prevArrow: <MdOutlineArrowBackIosNew />
    };

    return (
        <Slider {...settings}>
            {data.map((item, index) => {

                return (
                    <>
                        {isProductItem ? (
                            <ProductItem
                                src={item.images[0].imageUrl}
                                preSrc={item.images[1].imageUrl}
                                name={item.name}
                                price={item.price}
                                details={item}
                                isHomepage={false}
                                slideItem
                            />
                        ) : (
                            <img src='' key={index} alt='test' />
                        )}
                    </>
                );
            })}
        </Slider>
    );
}

export default SliderCommon;
