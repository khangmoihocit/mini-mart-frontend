import React, { useEffect, useState } from 'react';
import MyHeader from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';
import MainLayout from '@components/Layout/Layout';
import { FaHome, FaPhoneAlt, FaClock, FaFacebookF, FaInstagram, FaYoutube, FaTelegram } from 'react-icons/fa';
import styles from './styles.module.scss';
import Button from '@/components/Button/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập tin nhắn';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSuccessMessage('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    }, 1000);
  };

   useEffect(()=>{
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      }, []);

  return (
    <>
      <MyHeader />
      
      <MainLayout>
        <div className={styles.container}>
          {/* Map Image */}
          <div className={styles.mapImage}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119244.54709870428!2d105.8019441!3d21.028511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s" 
              width="100%" 
              height="400" 
              style={{ border: 0 }}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ Hà Nội"
            />
          </div>

          {/* Content Section */}
          <div className={styles.content}>
            {/* Information Section */}
            <div className={styles.informationSection}>
              <h2 className={styles.heading}>Thông Tin</h2>
              <div className={styles.divider}></div>

              {/* Address */}
              <div className={styles.infoBox}>
                <div className={styles.icon}>
                  <FaHome />
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>Địa Chỉ</div>
                  <p className={styles.text}>
                    Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội, Việt Nam
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className={styles.infoBox}>
                <div className={styles.icon}>
                  <FaPhoneAlt />
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>Điện Thoại</div>
                  <p className={styles.text}>
                    +84 24 3869 4123<br />
                    contact@minimart.vn
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className={styles.infoBox}>
                <div className={styles.icon}>
                  <FaClock />
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>Giờ Làm Việc</div>
                  <p className={styles.text}>
                    Thứ 2 - Chủ Nhật: 8:00 - 22:00
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className={styles.socialLinks}>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebookF />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube />
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                  <FaTelegram />
                </a>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className={styles.contactSection}>
              <h2 className={styles.heading}>Liên Hệ Với Chúng Tôi</h2>
              <div className={styles.divider}></div>

              <div className={styles.contactForm}>
                <p className={styles.description}>
                  Nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng để lại tin nhắn cho chúng tôi.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <div className={styles.inputWrapper}>
                      <input
                        type="text"
                        name="name"
                        placeholder="Họ và tên"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className={styles.error}>{errors.name}</div>}
                    </div>

                    <div className={styles.inputWrapper}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email của bạn"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className={styles.error}>{errors.email}</div>}
                    </div>
                  </div>

                  <textarea
                    name="message"
                    placeholder="Tin nhắn của bạn"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                  ></textarea>
                  {errors.message && <div className={styles.error}>{errors.message}</div>}

                  <Button type="submit" disabled={isSubmitting} content={isSubmitting ? 'Đang gửi...' : 'Gửi Ngay'} />

                  {successMessage && (
                    <div className={styles.successMessage}>
                      {successMessage}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>

      <MyFooter />
    </>
  );
};

export default Contact;