# 🚀 Quick Start - Chức năng đánh giá sản phẩm

## ✅ Đã hoàn thành

Chức năng đánh giá sản phẩm đã được code hoàn thiện 100%!

## 📦 Files đã tạo/sửa

**Tạo mới (14 files):**
- `src/apis/reviewService.js`
- `src/components/RatingStars/` (3 files)
- `src/components/ReviewCard/` (3 files)  
- `src/pages/Admin/components/Review/` (3 files)
- `REVIEW_FEATURE_README.md`
- `CHANGES_SUMMARY.md`
- `QUICK_START.md`

**Chỉnh sửa (4 files):**
- `src/pages/DetailProduct/components/Review.jsx`
- `src/pages/DetailProduct/index.jsx`
- `src/pages/DetailProduct/styles.module.scss`
- `src/pages/Admin/components/MainContent/MainContent.jsx`

## 🎯 Chức năng

### User
✅ Xem đánh giá + thống kê rating  
✅ Gửi đánh giá (rating 1-5 sao + comment)  
✅ Sửa/xóa đánh giá của mình  

### Admin
✅ Xem tất cả đánh giá  
✅ Tìm kiếm/lọc theo sản phẩm, user, số sao  
✅ Xóa bất kỳ đánh giá nào  

## 🔍 Cách test nhanh

### 1. Test User Flow
```
1. Mở trang chi tiết sản phẩm
2. Click tab "ĐÁNH GIÁ"
3. Đăng nhập (nếu chưa)
4. Chọn số sao (1-5)
5. Nhập comment (tùy chọn)
6. Click "GỬI ĐÁNH GIÁ"
7. Verify: đánh giá xuất hiện trong danh sách
```

### 2. Test Admin Flow
```
1. Đăng nhập với tài khoản Admin
2. Vào /admin
3. Click "Quản lý Đánh giá" trong sidebar (mục KHÁCH HÀNG)
4. Verify: hiển thị danh sách đánh giá
5. Test search/filter
6. Test xóa đánh giá
```

## 🌐 API Endpoints cần có

Backend cần implement 8 endpoints sau:

```javascript
POST   /reviews                           // Tạo review
PUT    /reviews/{reviewId}                // Cập nhật review
DELETE /reviews/{reviewId}                // Xóa review
GET    /reviews/{reviewId}                // Lấy review theo ID
GET    /reviews/product/{productId}       // Lấy reviews của sản phẩm
GET    /reviews/my-reviews                // Lấy reviews của user hiện tại
GET    /reviews/product/{productId}/rating // Lấy thống kê rating
GET    /reviews/all                       // Lấy tất cả reviews (Admin)
```

## ⚙️ Config cần kiểm tra

### 1. axiosClient.js
Đảm bảo base URL đúng:
```javascript
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api' // hoặc URL backend của bạn
});
```

### 2. Cookies
Code sử dụng cookies sau:
- `accessToken` - Token xác thực
- `userId` - ID user hiện tại

## 🎨 Screenshots

### User view - Trang chi tiết sản phẩm
- Thống kê rating với bar chart
- Danh sách reviews với avatar
- Form gửi đánh giá (interactive star rating)

### Admin view - Trang quản lý
- Table view với tất cả reviews
- Search bar + filter dropdown
- Nút xóa cho mỗi review

## ⚠️ Lưu ý quan trọng

1. **Mỗi user chỉ đánh giá 1 lần/sản phẩm**
   - Backend cần enforce rule này
   - Frontend đã handle hiển thị message

2. **Authentication required**
   - User phải login để đánh giá
   - Admin phải login để vào trang quản lý

3. **Validation**
   - Rating: 1-5 sao (bắt buộc)
   - Comment: tối đa 1000 ký tự (tùy chọn)

## 🐛 Troubleshooting

### Không hiển thị form đánh giá?
- Check user đã login chưa
- Check user đã đánh giá sản phẩm này chưa

### API call fails?
- Check baseURL trong axiosClient
- Check CORS configuration
- Check token trong cookies
- Check backend đã chạy chưa

### Admin không thấy menu "Quản lý Đánh giá"?
- Menu đã có sẵn trong dataSidebar.jsx
- Check user role có phải ADMIN không

## 📚 Documentation đầy đủ

Xem chi tiết trong:
- `REVIEW_FEATURE_README.md` - Hướng dẫn đầy đủ
- `CHANGES_SUMMARY.md` - Tóm tắt thay đổi

## ✨ Done!

Tất cả đã sẵn sàng để test và deploy! 🎉
