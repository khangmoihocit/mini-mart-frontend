# Hệ thống đánh giá sản phẩm - Hướng dẫn sử dụng

## 📋 Tổng quan

Hệ thống đánh giá sản phẩm đầy đủ với các chức năng:
- ✅ Người dùng gửi đánh giá sản phẩm (rating 1-5 sao + comment)
- ✅ Hiển thị tất cả đánh giá của sản phẩm với thống kê
- ✅ Quản lý đánh giá trong trang Admin
- ✅ Chỉnh sửa/xóa đánh giá của bản thân
- ✅ Admin có thể xóa bất kỳ đánh giá nào

## 📁 Cấu trúc files đã tạo

### 1. API Service
```
src/apis/reviewService.js
```
- Chứa tất cả các API calls cho chức năng đánh giá
- Các phương thức: createReview, updateReview, deleteReview, getReviewsByProduct, getProductRating, getAllReviews, getMyReviews

### 2. Components

#### RatingStars Component
```
src/components/RatingStars/
  ├── RatingStars.jsx
  └── styles.module.scss
```
- Component hiển thị và chọn rating 1-5 sao
- Có 2 modes: display (chỉ xem) và interactive (có thể click)
- Props:
  - `rating`: số sao (0-5)
  - `onRatingChange`: callback khi chọn sao (null = display mode)
  - `size`: 'small' | 'medium' | 'large'
  - `showText`: hiển thị text rating

#### ReviewCard Component
```
src/components/ReviewCard/
  ├── ReviewCard.jsx
  └── styles.module.scss
```
- Component hiển thị một đánh giá
- Có chức năng sửa/xóa (nếu là chủ sở hữu hoặc admin)
- Props:
  - `review`: object chứa thông tin review
  - `onUpdate`: callback khi update
  - `onDelete`: callback khi delete
  - `currentUserId`: ID user hiện tại
  - `isAdmin`: có phải admin không

### 3. Page Components

#### Review Component (DetailProduct)
```
src/pages/DetailProduct/components/Review.jsx
```
- Hiển thị trong trang chi tiết sản phẩm
- Chức năng:
  - Thống kê rating (trung bình, phân bố số sao)
  - Danh sách tất cả đánh giá
  - Form gửi đánh giá mới (chỉ cho user đã login và chưa đánh giá)
  - Chỉnh sửa/xóa đánh giá của mình

#### ReviewManagement Component (Admin)
```
src/pages/Admin/components/Review/
  ├── ReviewManagement.jsx
  └── styles.module.scss
```
- Trang quản lý đánh giá cho Admin
- Chức năng:
  - Xem tất cả đánh giá trong hệ thống
  - Tìm kiếm theo tên sản phẩm/người dùng
  - Lọc theo số sao
  - Xóa bất kỳ đánh giá nào

## 🚀 Cách sử dụng

### 1. Cho người dùng (User)

#### Xem đánh giá sản phẩm
1. Truy cập trang chi tiết sản phẩm
2. Click vào tab "ĐÁNH GIÁ"
3. Xem thống kê rating và danh sách đánh giá

#### Gửi đánh giá
1. Đăng nhập vào hệ thống
2. Vào trang chi tiết sản phẩm chưa đánh giá
3. Chọn số sao (1-5)
4. Nhập nhận xét (tùy chọn, tối đa 1000 ký tự)
5. Click "GỬI ĐÁNH GIÁ"

#### Sửa đánh giá của mình
1. Tìm đánh giá của bạn trong danh sách
2. Click nút "Sửa"
3. Thay đổi rating hoặc comment
4. Click "Lưu"

#### Xóa đánh giá
1. Tìm đánh giá của bạn
2. Click nút "Xóa"
3. Xác nhận xóa

### 2. Cho Admin

#### Truy cập trang quản lý
1. Đăng nhập với tài khoản Admin
2. Vào trang Admin
3. Click menu "Quản lý Đánh giá" trong sidebar (mục KHÁCH HÀNG)

#### Xem và lọc đánh giá
- Sử dụng ô tìm kiếm để tìm theo tên sản phẩm hoặc người dùng
- Sử dụng dropdown để lọc theo số sao
- Xem đầy đủ thông tin: sản phẩm, người đánh giá, email, rating, comment, ngày tạo

#### Xóa đánh giá
1. Tìm đánh giá cần xóa
2. Click nút "Xóa"
3. Xác nhận xóa

## 🔧 Cấu hình API

### Base URL
```javascript
${api.prefix}/reviews
```

### Authentication
Các API yêu cầu xác thực sử dụng token từ cookies:
- `accessToken`: Token xác thực
- `userId`: ID của user đang đăng nhập

## 📝 Business Rules

1. **Mỗi user chỉ được đánh giá 1 lần cho 1 sản phẩm**
   - Nếu đã đánh giá, sẽ hiển thị thông báo và không cho phép gửi thêm
   - User có thể sửa hoặc xóa đánh giá hiện tại

2. **Rating bắt buộc từ 1-5 sao**
   - Phải chọn ít nhất 1 sao để gửi đánh giá

3. **Comment là tùy chọn**
   - Tối đa 1000 ký tự
   - Có thể để trống

4. **Quyền xóa đánh giá**
   - User: chỉ xóa được đánh giá của mình
   - Admin: xóa được bất kỳ đánh giá nào

5. **Quyền sửa đánh giá**
   - Chỉ chủ sở hữu mới có thể sửa đánh giá của mình

## 🎨 Giao diện

### Trang chi tiết sản phẩm
- **Thống kê rating**: Hiển thị rating trung bình, tổng số đánh giá, phân bố theo số sao
- **Danh sách đánh giá**: Card view với avatar, tên, ngày, rating, comment
- **Form đánh giá**: Rating stars interactive + textarea cho comment

### Trang Admin
- **Header**: Tiêu đề + thống kê tổng số đánh giá
- **Filters**: Search input + dropdown lọc theo sao
- **Table**: Hiển thị đầy đủ thông tin đánh giá với nút xóa

## ⚠️ Error Handling

Hệ thống xử lý các lỗi phổ biến:
- 6001: Không tìm thấy đánh giá
- 6002: Bạn đã đánh giá sản phẩm này rồi
- 6003: Bạn không có quyền thực hiện thao tác này
- 6004: Người dùng không tồn tại
- 3001: Không tìm thấy sản phẩm

Tất cả lỗi được hiển thị qua toast notification.

## 🔍 Testing

### Test cases cần kiểm tra:

1. **Gửi đánh giá**
   - [ ] User chưa login không thấy form đánh giá
   - [ ] User đã login thấy form và gửi được đánh giá
   - [ ] Không thể gửi nếu chưa chọn số sao
   - [ ] Comment không vượt quá 1000 ký tự
   - [ ] Không gửi được đánh giá trùng lặp

2. **Hiển thị đánh giá**
   - [ ] Thống kê rating hiển thị đúng
   - [ ] Danh sách đánh giá load đầy đủ
   - [ ] Phân bố số sao tính toán chính xác

3. **Sửa/xóa đánh giá**
   - [ ] Chỉ hiển thị nút sửa/xóa cho đánh giá của mình
   - [ ] Sửa đánh giá cập nhật thành công
   - [ ] Xóa đánh giá với confirmation modal

4. **Admin**
   - [ ] Admin thấy tất cả đánh giá
   - [ ] Tìm kiếm hoạt động đúng
   - [ ] Lọc theo số sao chính xác
   - [ ] Admin xóa được mọi đánh giá

## 📦 Dependencies mới

Không có dependencies mới cần cài đặt. Sử dụng các packages có sẵn:
- react-icons (đã có)
- Cookies (đã có)
- Các contexts: ToastContext (đã có)

## 🎯 Next Steps

Có thể mở rộng thêm:
1. Pagination cho danh sách đánh giá
2. Sort đánh giá theo ngày/rating
3. Upload ảnh trong đánh giá
4. Reply/comment vào đánh giá
5. Like/dislike đánh giá hữu ích
6. Export danh sách đánh giá (Admin)
7. Email notification khi có đánh giá mới

## 💡 Lưu ý khi deploy

1. Đảm bảo API endpoint đúng trong reviewService.js
2. Check CORS policy cho các API calls
3. Test authentication flow đầy đủ
4. Kiểm tra responsive design trên mobile
5. Test performance với nhiều đánh giá (>100 items)

---

**Version**: 1.0.0  
**Last Updated**: January 4, 2026  
**Author**: GitHub Copilot
