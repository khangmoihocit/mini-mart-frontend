import { useState } from 'react';
import orderService from '@/apis/orderService';
import { toast } from 'react-toastify';
import styles from './UpdateStatusModal.module.scss';

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Chờ xử lý', description: 'Đơn hàng mới, chưa xử lý' },
  { value: 'PROCESSING', label: 'Đang xử lý', description: 'Đang chuẩn bị hàng' },
  { value: 'SHIPPED', label: 'Đang giao hàng', description: 'Đang vận chuyển đến khách' },
  { value: 'DELIVERED', label: 'Đã giao hàng', description: 'Đã giao thành công' },
  { value: 'CANCELLED', label: 'Đã hủy', description: 'Đơn hàng bị hủy' },
];

function UpdateStatusModal({ order, onClose, onSuccess }) {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedStatus === order.status) {
      toast.info('Vui lòng chọn trạng thái khác!');
      return;
    }

    setIsSubmitting(true);
    
    orderService.updateOrderStatus(order.id, { status: selectedStatus })
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || 'Không thể cập nhật trạng thái';
        toast.error(errorMessage);
        setIsSubmitting(false);
      });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Cập nhật trạng thái đơn hàng</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
            </svg>
          </button>
        </div>

        <div className={styles.orderInfo}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Mã đơn hàng:</span>
            <span className={styles.value}>{order.id}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Khách hàng:</span>
            <span className={styles.value}>{order.fullName}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Tổng tiền:</span>
            <span className={styles.value}>{order.totalMoney.toLocaleString()} đ</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Trạng thái hiện tại:</span>
            <span className={`${styles.value} ${styles.currentStatus}`}>
              {STATUS_OPTIONS.find(s => s.value === order.status)?.label}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.statusOptions}>
            <label className={styles.formLabel}>Chọn trạng thái mới:</label>
            {STATUS_OPTIONS.map((status) => (
              <div
                key={status.value}
                className={`${styles.statusOption} ${selectedStatus === status.value ? styles.selected : ''}`}
                onClick={() => setSelectedStatus(status.value)}
              >
                <div className={styles.radioWrapper}>
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={selectedStatus === status.value}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />
                  <div className={styles.radioCustom}></div>
                </div>
                <div className={styles.statusInfo}>
                  <span className={styles.statusLabel}>{status.label}</span>
                  <span className={styles.statusDescription}>{status.description}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.modalFooter}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onClose}
              disabled={isSubmitting}
            >
              Hủy
            </button>
            <button
              type="submit"
              className={styles.btnSubmit}
              disabled={isSubmitting || selectedStatus === order.status}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Cập nhật'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateStatusModal;
