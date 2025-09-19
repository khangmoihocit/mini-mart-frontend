# React Toastify Integration Guide

## 🎯 Tổng quan
Dự án đã tích hợp react-toastify với custom styling phù hợp với thiết kế hiện tại. Toast notifications được tối ưu với animations mượt mà và design nhất quán.

## 🚀 Cách sử dụng

### Import toast utility
```javascript
import toast from '@/utils/toast';
```

### Basic Usage

#### 1. Success Toast
```javascript
toast.success('Thao tác thành công!');
```

#### 2. Error Toast
```javascript
toast.error('Có lỗi xảy ra!');
```

#### 3. Warning Toast
```javascript
toast.warning('Cảnh báo: Kiểm tra lại dữ liệu!');
```

#### 4. Info Toast
```javascript
toast.info('Thông tin quan trọng');
```

### Advanced Usage

#### 1. Loading Toast với Update
```javascript
// Tạo loading toast
const loadingToast = toast.loading('Đang xử lý...');

// Sau khi hoàn thành
try {
    await apiCall();
    toast.updateToSuccess(loadingToast, 'Xử lý thành công!');
} catch (error) {
    toast.updateToError(loadingToast, 'Xử lý thất bại!');
}
```

#### 2. Promise Toast (Tự động)
```javascript
const apiPromise = fetch('/api/data');

toast.promise(apiPromise, {
    loading: 'Đang tải dữ liệu...',
    success: 'Tải thành công!',
    error: 'Tải thất bại!'
});
```

#### 3. Action Toast (Có nút hành động)
```javascript
toast.action(
    'Bạn có muốn xóa mục này?',
    'Xác nhận',
    () => {
        // Hành động khi click nút
        deleteItem();
    },
    {
        autoClose: 8000 // Tùy chọn thêm
    }
);
```

#### 4. Custom Options
```javascript
toast.success('Message', {
    position: "top-left",
    autoClose: 6000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: false,
});
```

### Utility Functions

#### Dismiss Toasts
```javascript
// Dismiss một toast cụ thể
const toastId = toast.success('Message');
toast.dismiss(toastId);

// Dismiss tất cả
toast.dismissAll();
```

## 🎨 Customization

### Toast Styles
Các toast được custom với:
- ✅ Gradient backgrounds
- ✅ Glass morphism effect
- ✅ Smooth animations
- ✅ Icons cho từng loại
- ✅ Hover effects
- ✅ Responsive design

### Color Scheme
- **Success**: Green gradient (#4ade80 → #22c55e)
- **Error**: Red gradient (#f87171 → #ef4444)
- **Warning**: Orange gradient (#fbbf24 → #f59e0b)
- **Info**: Blue gradient (#60a5fa → #3b82f6)
- **Default**: Gray gradient với border

### Animation Types
- **slideInRight**: Từ phải sang (default cho top-right)
- **slideInLeft**: Từ trái sang (cho top-left)
- **slideInUp**: Từ dưới lên (cho bottom positions)

## 📍 Positioning
```javascript
// Các vị trí có sẵn
"top-right"     // Default
"top-left"
"top-center"
"bottom-right"
"bottom-left"
"bottom-center"
```

## 🛠️ Best Practices

### 1. Thời gian hiển thị
- **Success**: 4 giây (default)
- **Error**: 6 giây (lâu hơn để user đọc)
- **Warning**: 4 giây
- **Info**: 4 giây
- **Action**: 8 giây (để user có thời gian hành động)

### 2. Messages nên
- ✅ Ngắn gọn, dễ hiểu
- ✅ Có ý nghĩa với người dùng
- ✅ Sử dụng tiếng Việt có dấu
- ✅ Không quá kỹ thuật

### 3. Khi nào sử dụng
- **Success**: Sau khi hoàn thành thành công một hành động
- **Error**: Khi có lỗi xảy ra
- **Warning**: Cảnh báo trước khi thực hiện hành động nguy hiểm
- **Info**: Thông tin không critical
- **Loading**: Cho các tác vụ mất thời gian

## 📦 Implementation Examples

### Trong UserList Component
```javascript
// Delete user với confirmation
const handleDeleteUser = async (userId) => {
    toast.action(
        'Bạn có chắc chắn muốn xóa người dùng này?',
        'Xác nhận',
        async () => {
            const loadingToast = toast.loading('Đang xóa...');
            try {
                await deleteUser(userId);
                toast.updateToSuccess(loadingToast, 'Xóa thành công!');
            } catch (error) {
                toast.updateToError(loadingToast, 'Xóa thất bại!');
            }
        }
    );
};
```

### Trong Auth Hook
```javascript
// Login success
toast.success('Đăng nhập thành công! Chào mừng bạn quay trở lại.');

// Login error
toast.error('Đăng nhập thất bại. Vui lòng kiểm tra thông tin!');
```

## 🔧 Configuration

Toast container được cấu hình trong `App.jsx`:
```jsx
<ToastContainer
    position="top-right"
    autoClose={4000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    className="custom-toast-container"
/>
```

## 🎯 Testing

Để test toast notifications, sử dụng component `ToastDemo`:
```javascript
import ToastDemo from '@/components/ToastDemo/ToastDemo';

// Render trong development
<ToastDemo />
```

---

**Lưu ý**: Toast notifications đã được tích hợp sẵn vào các hook và components chính của dự án. Chỉ cần import và sử dụng theo hướng dẫn trên!