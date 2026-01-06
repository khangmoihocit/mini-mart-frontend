import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import Logos from '@/pages/AboutUs/components/Logos';

function AboutUs() {
  const {
    container,
    functionBox,
    specialText,
    btnBack,
    containerTitle,
    line,
    title,
    textS,
    textL,
    containerContent,
    des,
  } = styles;

  const dataContents = [
    {
      id: '1',
      url: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-copy-min.jpg',
      des: 'Chúng tôi cung cấp các sản phẩm chất lượng cao với giá cả phải chăng. Mỗi sản phẩm được lựa chọn kỹ lưỡng để đáp ứng nhu cầu của khách hàng.',
    },
    {
      id: '2',
      url: 'https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-copy-2-min.jpg',
      des: 'Dịch vụ khách hàng của chúng tôi luôn sẵn sàng hỗ trợ 24/7. Chúng tôi cam kết mang lại trải nghiệm mua sắm tốt nhất cho bạn.',
    },
    {
      id: '3',
      url: 'http://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image-min.jpg',
      des: 'Với những năm kinh nghiệm trong ngành, Marseille04 Shop tự hào là địa chỉ tin cậy của hàng triệu khách hàng Việt Nam.',
    },
  ];

  return (
    <>
      <MyHeader />

      <MainLayout>
        <div className={container}>
          <div className={functionBox}>
            <div>
              Trang chủ &gt; <span className={specialText}>Về chúng tôi</span>
            </div>
            <div className={btnBack} onClick={() => window.history.back()}>
              &lt; Quay lại trang trước
            </div>
          </div>

          <div className={containerTitle}>
            <div className={line}>
              <div className={title}>
                <div className={textS}>chúng tôi cố gắng hết sức vì bạn</div>
                <div className={textL}>Chào mừng đến với Shop</div>
              </div>
            </div>
          </div>

          <div className={containerContent}>
            {dataContents.map((item) => (
              <div key={item.id}>
                <img src={item.url} alt="" />
                <div className={des}>{item.des}</div>
              </div>
            ))}
          </div>

          <Logos />
        </div>
      </MainLayout>

      <MyFooter />
    </>
  );
}

export default AboutUs;
