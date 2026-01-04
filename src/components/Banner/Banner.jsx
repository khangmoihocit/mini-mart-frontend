import React from 'react';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const { container, content, title, desc} = styles;
    const navigate = useNavigate();
    return (
        <div className={container}>
            <div className={content}>
                <h1 className={title}>Shop quần áo</h1>
                <div className={desc} style={{fontSize:"18px", fontWeight:"400", lineHeight:"28px", marginBottom:"24px", textAlign:"center"}}>
                    Làm cho những dịp kỷ niệm của bạn trở nên đặc biệt hơn 
                   <br /> trong năm nay với những điều tuyệt vời.
                </div>
                <div style={{width: '176px'}}>
                    <Button content={'Đi tới cửa hàng'} onClick={() => navigate('/shop')} />
                </div>
            </div>
        </div>
    );
};

export default Banner;
