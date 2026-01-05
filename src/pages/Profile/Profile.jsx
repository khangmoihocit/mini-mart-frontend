import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '@/apis/userService';
import MyHeader from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';
import MainLayout from '@components/Layout/Layout';
import { toast } from 'react-toastify';
import { formatErrorMessage } from '@/utils/helpers';
import { StoreContext } from '@/contexts/StoreProvider';
import styles from './styles.module.scss';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiShoppingBag, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi';
import Cookies from 'js-cookie';

function Profile() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setUserInfo: setGlobalUserInfo } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const response = await userService.getMyInfo();
      if (response.data.code === 0) {
        setUserInfo(response.data.result);
      }
    } catch (error) {
      toast.error(formatErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      Cookies.remove('token');
      Cookies.remove('refreshToken');
      Cookies.remove('userId');
      setGlobalUserInfo(null);
      toast.success('Đăng xuất thành công!');
      navigate('/login');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Chưa cập nhật';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  if (isLoading) {
    return (
      <>
        <MyHeader />
        <MainLayout>
          <div className={styles.profile}>
            <div className={styles.loading}>Đang tải thông tin...</div>
          </div>
        </MainLayout>
        <MyFooter />
      </>
    );
  }

  if (!userInfo) {
    return (
      <>
        <MyHeader />
        <MainLayout>
          <div className={styles.profile}>
            <div className={styles.error}>Không thể tải thông tin người dùng</div>
          </div>
        </MainLayout>
        <MyFooter />
      </>
    );
  }

  return (
    <>
      <MyHeader />
      <MainLayout>
        <div className={styles.profile}>
          <h1 className={styles.title} style={{marginTop: '70px'}}>Thông tin cá nhân</h1>

          {/* User Card */}
          <div className={styles.userCard}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>
                <FiUser size={50} />
              </div>
              <div className={styles.userBasicInfo}>
                <h2>{userInfo.fullName}</h2>
                <p className={styles.email}>{userInfo.email}</p>
                <div className={styles.badges}>
                  <span className={styles.role}>{userInfo.role.name}</span>
                  <span className={userInfo.isActive ? styles.active : styles.inactive}>
                    {userInfo.isActive ? 'Đang hoạt động' : 'Tạm khóa'}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Personal Information */}
          <div className={styles.infoSection}>
            <h3 className={styles.sectionTitle}>Thông tin chi tiết</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <FiUser className={styles.icon} />
                <div>
                  <span className={styles.label}>Họ và tên</span>
                  <span className={styles.value}>{userInfo.fullName}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FiMail className={styles.icon} />
                <div>
                  <span className={styles.label}>Email</span>
                  <span className={styles.value}>{userInfo.email}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FiPhone className={styles.icon} />
                <div>
                  <span className={styles.label}>Số điện thoại</span>
                  <span className={styles.value}>{userInfo.phoneNumber || 'Chưa cập nhật'}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FiCalendar className={styles.icon} />
                <div>
                  <span className={styles.label}>Ngày sinh</span>
                  <span className={styles.value}>{formatDate(userInfo.dateOfBirth)}</span>
                </div>
              </div>

              <div className={styles.infoItem}>
                <FiMapPin className={styles.icon} />
                <div>
                  <span className={styles.label}>Địa chỉ</span>
                  <span className={styles.value}>{userInfo.address || 'Chưa cập nhật'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.actionsSection}>
            <h3 className={styles.sectionTitle}>Quản lý tài khoản</h3>
            <div className={styles.actionGrid}>
              <button 
                className={styles.actionBtn}
                onClick={() => navigate('/my-orders')}
              >
                <FiShoppingBag className={styles.actionIcon} />
                <div>
                  <h4>Đơn hàng của tôi</h4>
                  <p>Xem lịch sử đơn hàng</p>
                </div>
              </button>

              

              <button 
                className={styles.actionBtn}
                onClick={() => {
                  toast.info('Tính năng đang phát triển');
                }}
              >
                <FiSettings className={styles.actionIcon} />
                <div>
                  <h4>Cài đặt tài khoản</h4>
                  <p>Chỉnh sửa thông tin</p>
                </div>
              </button>

              <button 
                className={`${styles.actionBtn} ${styles.logoutBtn}`}
                onClick={handleLogout}
              >
                <FiLogOut className={styles.actionIcon} />
                <div>
                  <h4>Đăng xuất</h4>
                  <p>Thoát khỏi tài khoản</p>
                </div>
              </button>
            </div>
          </div>

          {/* Account Details */}
          <div className={styles.accountDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Ngày tạo tài khoản:</span>
              <span className={styles.detailValue}>{formatDate(userInfo.createdAt)}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Cập nhật lần cuối:</span>
              <span className={styles.detailValue}>{formatDate(userInfo.updatedAt)}</span>
            </div>
          </div>
        </div>
      </MainLayout>
      <MyFooter />
    </>
  );
}

export default Profile;
