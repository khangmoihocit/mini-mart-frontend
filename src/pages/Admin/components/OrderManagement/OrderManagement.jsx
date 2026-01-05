import { useState, useEffect } from 'react';
import orderService from '@/apis/orderService';
import { toast } from 'react-toastify';
import UpdateStatusModal from './UpdateStatusModal';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import styles from './styles.module.scss';
import { formatErrorMessage } from '@/utils/helpers';

const ORDER_STATUSES = [
  { value: 'ALL', label: 'Tất cả', color: '#333' },
  { value: 'PENDING', label: 'Chờ xử lý', color: '#ff9800' },
  { value: 'PROCESSING', label: 'Đang xử lý', color: '#2196f3' },
  { value: 'SHIPPED', label: 'Đang giao hàng', color: '#9c27b0' },
  { value: 'DELIVERED', label: 'Đã giao hàng', color: '#4caf50' },
  { value: 'CANCELLED', label: 'Đã hủy', color: '#f44336' },
];

function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 10,
    totalElements: 0,
    totalPages: 0,
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  
  // Delete confirmation
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const fetchOrders = (status = 'ALL', page = 1) => {
    setIsLoading(true);
    
    const apiCall = status === 'ALL' 
      ? orderService.getAllOrdersAdmin(page, 10)
      : orderService.getOrdersByStatusAdmin(status, page, 10);

    apiCall
      .then((res) => {
        const result = res.data.result;
        setOrders(result.content || []);
        setPagination({
          pageNo: result.pageNo,
          pageSize: result.pageSize,
          totalElements: result.totalElements,
          totalPages: result.totalPages,
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading orders:', err);
        toast.error('Không thể tải danh sách đơn hàng');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders(selectedStatus, 1);
  }, [selectedStatus]);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchOrders(selectedStatus, newPage);
    }
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setShowUpdateModal(true);
  };

  const handleStatusUpdated = () => {
    setShowUpdateModal(false);
    fetchOrders(selectedStatus, pagination.pageNo);
    toast.success('Cập nhật trạng thái thành công!');
  };

  const handleDeleteClick = (order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!orderToDelete) return;
    
    try {
      await orderService.deleteOrderAdmin(orderToDelete.id);
      toast.success('Xóa đơn hàng thành công!');
      setIsDeleteModalOpen(false);
      setOrderToDelete(null);
      fetchOrders(selectedStatus, pagination.pageNo);
    } catch (err) {
      toast.error(formatErrorMessage(err));
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setOrderToDelete(null);
  };

  const getStatusBadge = (status) => {
    const statusObj = ORDER_STATUSES.find(s => s.value === status);
    return (
      <span 
        className={styles.statusBadge}
        style={{ backgroundColor: statusObj?.color || '#999' }}
      >
        {statusObj?.label || status}
      </span>
    );
  };

  return (
    <div className={styles.orderManagement}>
      <div className={styles.header}>
        <h2>Quản lý đơn hàng</h2>
        <div className={styles.stats}>
          <span>Tổng: {pagination.totalElements} đơn</span>
        </div>
      </div>

      <div className={styles.filters}>
        {ORDER_STATUSES.map((status) => (
          <button
            key={status.value}
            className={`${styles.filterBtn} ${selectedStatus === status.value ? styles.active : ''}`}
            onClick={() => handleStatusChange(status.value)}
            style={{ 
              borderColor: selectedStatus === status.value ? status.color : '#e0e0e0',
              color: selectedStatus === status.value ? status.color : '#666'
            }}
          >
            {status.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className={styles.loading}>Đang tải...</div>
      ) : orders.length === 0 ? (
        <div className={styles.empty}>Không có đơn hàng nào</div>
      ) : (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.ordersTable}>
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>SĐT</th>
                  <th>Địa chỉ</th>
                  <th>Ngày đặt</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className={styles.orderId}>
                      <span title={order.id}>{order.id.slice(0, 8)}...</span>
                    </td>
                    <td>
                      <div className={styles.customerInfo}>
                        <strong>{order.fullName}</strong>
                        <small>{order.email}</small>
                      </div>
                    </td>
                    <td>{order.phoneNumber}</td>
                    <td className={styles.address}>
                      <span title={order.shippingAddress}>
                        {order.shippingAddress.substring(0, 30)}...
                      </span>
                    </td>
                    <td>
                      {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                    </td>
                    <td className={styles.totalMoney}>
                      {order.totalMoney.toLocaleString()} đ
                    </td>
                    <td>
                      <small>{order.paymentMethod}</small>
                    </td>
                    <td>{getStatusBadge(order.status)}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.btnUpdate}
                          onClick={() => handleUpdateStatus(order)}
                          title="Cập nhật trạng thái"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M11.013 1.427a1.75 1.75 0 012.474 0l1.086 1.086a1.75 1.75 0 010 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 01-.927-.928l.929-3.25a1.75 1.75 0 01.445-.758l8.61-8.61zm1.414 1.06a.25.25 0 00-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 000-.354l-1.086-1.086zM11.189 6.25L9.75 4.81l-6.286 6.287a.25.25 0 00-.064.108l-.558 1.953 1.953-.558a.249.249 0 00.108-.064l6.286-6.286z"/>
                          </svg>
                        </button>
                        <button
                          className={styles.btnDelete}
                          onClick={() => handleDeleteClick(order)}
                          title="Xóa đơn hàng"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(pagination.pageNo - 1)}
                disabled={pagination.pageNo === 1}
                className={styles.pageBtn}
              >
                ‹ Trước
              </button>
              
              <div className={styles.pageInfo}>
                Trang {pagination.pageNo} / {pagination.totalPages}
              </div>

              <button
                onClick={() => handlePageChange(pagination.pageNo + 1)}
                disabled={pagination.pageNo === pagination.totalPages}
                className={styles.pageBtn}
              >
                Sau ›
              </button>
            </div>
          )}
        </>
      )}

      {showUpdateModal && selectedOrder && (
        <UpdateStatusModal
          order={selectedOrder}
          onClose={() => setShowUpdateModal(false)}
          onSuccess={handleStatusUpdated}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Xác nhận xóa đơn hàng"
        message={`Bạn có chắc chắn muốn xóa đơn hàng "${orderToDelete?.id}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
      />
    </div>
  );
}

export default OrderManagement;
