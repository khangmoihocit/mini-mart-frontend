# TÀI LIỆU MÔ TẢ CẤU TRÚC DỰ ÁN MINI-MART FRONTEND

## 📋 Tổng Quan Dự Án

**Mini-mart Frontend** là ứng dụng web thương mại điện tử được xây dựng với React và Vite. Dự án cung cấp giao diện người dùng cho một cửa hàng mini-mart trực tuyến với đầy đủ tính năng mua sắm, quản lý đơn hàng và quản trị hệ thống.

### Công Nghệ Sử Dụng

- **Framework:** React 18.2.0
- **Build Tool:** Vite 7.1.5
- **Routing:** React Router DOM 7.8.2
- **State Management:** Context API
- **HTTP Client:** Axios 1.12.0
- **Form Handling:** Formik 2.4.6, React Hook Form 7.70.0
- **UI Components:** React Icons, Swiper, React Slick
- **Validation:** Yup 1.7.0
- **Styling:** SASS/SCSS với CSS Modules
- **Charts:** Recharts 3.6.0
- **Notifications:** React Toastify 11.0.5

---

## 📁 Cấu Trúc Thư Mục Chi Tiết

```
mini-mart-frontend/
│
├── public/                         # Tài nguyên tĩnh công khai
│
├── src/                           # Mã nguồn chính
│   ├── apis/                      # Dịch vụ API và HTTP Client
│   │   ├── axiosClient.js        # Cấu hình Axios instance
│   │   ├── authService.js        # API xác thực người dùng
│   │   ├── cartService.js        # API giỏ hàng
│   │   ├── categoryService.js    # API danh mục sản phẩm
│   │   ├── orderService.js       # API quản lý đơn hàng
│   │   ├── productService.js     # API sản phẩm
│   │   ├── reviewService.js      # API đánh giá sản phẩm
│   │   ├── statisticsService.js  # API thống kê
│   │   └── userService.js        # API quản lý người dùng
│   │
│   ├── assets/                    # Tài nguyên tĩnh
│   │   ├── icons/                # Icons và hình ảnh nhỏ
│   │   │   ├── images/          # Hình ảnh icon
│   │   │   ├── payment/         # Icon phương thức thanh toán
│   │   │   └── svgs/            # File SVG
│   │   ├── images/               # Hình ảnh lớn
│   │   └── styles/               # Styles toàn cục
│   │       ├── _global.module.scss      # Styles global
│   │       ├── _mixins.module.scss      # SCSS Mixins
│   │       ├── _variables.module.scss   # SCSS Variables
│   │       └── main.scss                # Entry point CSS
│   │
│   ├── components/                # Components tái sử dụng
│   │   ├── AccordionMenu/        # Menu accordion
│   │   ├── AdvanceHeadling/      # Heading nâng cao
│   │   ├── Banner/               # Banner quảng cáo
│   │   ├── Button/               # Nút bấm tùy chỉnh
│   │   ├── ConfirmationModal/    # Modal xác nhận
│   │   ├── ContentSideBar/       # Sidebar nội dung
│   │   │   ├── Cart/            # Sidebar giỏ hàng
│   │   │   ├── Compare/         # Sidebar so sánh
│   │   │   ├── DetailProduct/   # Sidebar chi tiết sản phẩm
│   │   │   ├── Login/           # Sidebar đăng nhập
│   │   │   └── WishList/        # Sidebar danh sách yêu thích
│   │   ├── CountdownBanner/      # Banner đếm ngược
│   │   ├── CountdownTimer/       # Bộ đếm thời gian
│   │   ├── ErrorBoundary/        # Xử lý lỗi React
│   │   ├── Footer/               # Footer trang
│   │   ├── Header/               # Header trang
│   │   ├── HeadingListProduct/   # Heading danh sách sản phẩm
│   │   ├── Info/                 # Thông tin
│   │   ├── InputCommon/          # Input tùy chỉnh
│   │   ├── Layout/               # Layout wrapper
│   │   ├── LoadingDemo/          # Loading demo
│   │   ├── LoadingOverlay/       # Loading overlay
│   │   ├── LoadingTextCommon/    # Loading text
│   │   ├── Message/              # Hiển thị thông báo
│   │   ├── Pagination/           # Phân trang
│   │   ├── PaymentMethods/       # Phương thức thanh toán
│   │   ├── PopularProduct/       # Sản phẩm phổ biến
│   │   ├── ProductItem/          # Item sản phẩm
│   │   ├── RatingStars/          # Đánh giá sao
│   │   ├── ReviewCard/           # Card đánh giá
│   │   ├── SaleHomePage/         # Sale homepage
│   │   ├── Sidebar/              # Sidebar chính
│   │   └── SliderCommon/         # Slider tùy chỉnh
│   │
│   ├── constants/                 # Hằng số và cấu hình
│   │   ├── dataLanguage.js       # Dữ liệu ngôn ngữ
│   │   ├── dataSidebar.jsx       # Cấu hình sidebar
│   │   ├── messages.js           # Thông báo
│   │   └── routes.js             # Định nghĩa routes
│   │
│   ├── contexts/                  # React Context Providers
│   │   ├── AdminProvider.jsx     # Context quản trị
│   │   ├── AppProvider.jsx       # Context ứng dụng chính
│   │   ├── CategoryProvider.jsx  # Context danh mục
│   │   ├── OurShopProvider.jsx   # Context cửa hàng
│   │   ├── ProductProvider.jsx   # Context sản phẩm
│   │   ├── SidebarProvider.jsx   # Context sidebar
│   │   ├── SteperProvider.jsx    # Context stepper
│   │   ├── StoreProvider.jsx     # Context store
│   │   ├── ToastProvider.jsx     # Context thông báo
│   │   ├── UserInfoProvider.jsx  # Context thông tin user
│   │   ├── UserProvider.jsx      # Context user
│   │   └── WishlistProvider.jsx  # Context wishlist
│   │
│   ├── hooks/                     # Custom React Hooks
│   │   ├── useAuth.js            # Hook xác thực
│   │   ├── useHighlight.jsx      # Hook highlight
│   │   ├── useScrollHandling.js  # Hook xử lý scroll
│   │   ├── useTranslateXImage.js # Hook animation ảnh
│   │   └── useUsers.js           # Hook quản lý users
│   │
│   ├── pages/                     # Pages chính của ứng dụng
│   │   ├── AboutUs/              # Trang giới thiệu
│   │   ├── Admin/                # Trang quản trị
│   │   ├── Cart/                 # Trang giỏ hàng
│   │   ├── Contact/              # Trang liên hệ
│   │   ├── DetailProduct/        # Trang chi tiết sản phẩm
│   │   ├── HomePage/             # Trang chủ
│   │   ├── Login/                # Trang đăng nhập
│   │   ├── MyOrders/             # Trang đơn hàng của tôi
│   │   ├── OrderDetail/          # Trang chi tiết đơn hàng
│   │   ├── OurShop/              # Trang cửa hàng
│   │   └── Profile/              # Trang hồ sơ người dùng
│   │
│   ├── routers/                   # Cấu hình routing
│   │   └── routers.js            # Định nghĩa routes
│   │
│   ├── utils/                     # Utility functions
│   │   └── helpers.js            # Helper functions
│   │
│   ├── validations/               # Schema validation
│   │   └── authSchemas.js        # Schema xác thực
│   │
│   ├── App.jsx                    # Component App chính
│   └── main.jsx                   # Entry point
│
├── index.html                     # HTML template
├── jsconfig.json                  # Cấu hình JavaScript
├── package.json                   # Dependencies và scripts
└── vite.config.js                # Cấu hình Vite
```

---

## 🔑 Thành Phần Chính

### 1. **APIs Layer** (`src/apis/`)

Quản lý tất cả các tương tác với backend API:

- **axiosClient.js**: Cấu hình Axios instance với interceptors, base URL, headers mặc định
- **authService.js**: Xử lý đăng nhập, đăng ký, đăng xuất, refresh token
- **cartService.js**: CRUD operations cho giỏ hàng
- **categoryService.js**: Lấy danh sách danh mục sản phẩm
- **productService.js**: CRUD và tìm kiếm sản phẩm
- **orderService.js**: Tạo và quản lý đơn hàng
- **reviewService.js**: Đánh giá và nhận xét sản phẩm
- **statisticsService.js**: Lấy dữ liệu thống kê cho admin
- **userService.js**: Quản lý thông tin người dùng

### 2. **Components** (`src/components/`)

Thư viện components tái sử dụng được chia thành các nhóm:

#### 2.1. Layout Components
- **Header**: Thanh điều hướng trên cùng với logo, menu, tìm kiếm, giỏ hàng
- **Footer**: Thông tin liên hệ, links, social media
- **Sidebar**: Sidebar chính cho navigation
- **Layout**: Wrapper component cho layout chung

#### 2.2. UI Components
- **Button**: Nút bấm có thể tùy chỉnh với nhiều variants
- **InputCommon**: Input field với validation
- **Modal**: ConfirmationModal cho các hành động quan trọng
- **Message**: Hiển thị thông báo cho người dùng
- **LoadingOverlay**, **LoadingDemo**: Loading states

#### 2.3. Product Components
- **ProductItem**: Card hiển thị thông tin sản phẩm
- **PopularProduct**: Hiển thị sản phẩm phổ biến
- **RatingStars**: Hiển thị đánh giá sao
- **ReviewCard**: Card đánh giá của khách hàng

#### 2.4. Sidebar Components (ContentSideBar)
- **Cart**: Sidebar giỏ hàng nhanh
- **WishList**: Sidebar danh sách yêu thích
- **Login**: Sidebar đăng nhập nhanh
- **Compare**: Sidebar so sánh sản phẩm
- **DetailProduct**: Sidebar xem nhanh sản phẩm

#### 2.5. Special Components
- **CountdownTimer**, **CountdownBanner**: Đếm ngược cho flash sale
- **SliderCommon**: Carousel/Slider tùy chỉnh
- **Banner**: Banner quảng cáo
- **ErrorBoundary**: Bắt và xử lý lỗi React

### 3. **Contexts** (`src/contexts/`)

Quản lý state toàn cục bằng React Context API:

- **AppProvider**: State chung của ứng dụng
- **ToastProvider**: Quản lý thông báo toast
- **WishlistProvider**: Quản lý danh sách yêu thích
- **ProductProvider**: State sản phẩm
- **CategoryProvider**: State danh mục
- **UserProvider**, **UserInfoProvider**: State người dùng
- **AdminProvider**: State cho trang quản trị
- **SidebarProvider**: Quản lý trạng thái sidebar
- **StoreProvider**: State cửa hàng
- **OurShopProvider**: State trang shop
- **SteperProvider**: State cho stepper (checkout flow)

### 4. **Pages** (`src/pages/`)

Các trang chính của ứng dụng:

#### 4.1. Public Pages
- **HomePage**: Trang chủ với banner, sản phẩm nổi bật, deals
- **OurShop**: Trang danh sách sản phẩm với filter và search
- **DetailProduct**: Chi tiết sản phẩm với ảnh, mô tả, reviews
- **AboutUs**: Giới thiệu về cửa hàng
- **Contact**: Form liên hệ

#### 4.2. User Pages
- **Login**: Đăng nhập/Đăng ký
- **Profile**: Quản lý hồ sơ cá nhân
- **Cart**: Giỏ hàng và checkout
- **MyOrders**: Danh sách đơn hàng của người dùng
- **OrderDetail**: Chi tiết từng đơn hàng

#### 4.3. Admin Pages
- **Admin**: Dashboard quản trị với thống kê, quản lý sản phẩm, đơn hàng, users

### 5. **Routing** (`src/routers/`)

Định nghĩa các routes với lazy loading:

```javascript
- /                  -> HomePage
- /login            -> Login
- /admin            -> Admin
- /shop             -> OurShop
- /cart             -> Cart
- /product/:id      -> DetailProduct
- /my-orders        -> MyOrders
- /order/:orderId   -> OrderDetail
- /profile          -> Profile
- /about-us         -> AboutUs
- /contact          -> Contact
```

### 6. **Custom Hooks** (`src/hooks/`)

Các React hooks tái sử dụng:

- **useAuth**: Quản lý authentication state và methods
- **useUsers**: CRUD operations cho users
- **useScrollHandling**: Xử lý scroll events và behaviors
- **useHighlight**: Highlight text hoặc elements
- **useTranslateXImage**: Animation cho images

### 7. **Utilities** (`src/utils/`)

- **helpers.js**: Các helper functions như format currency, date, validate input, etc.

### 8. **Validations** (`src/validations/`)

- **authSchemas.js**: Yup validation schemas cho forms đăng nhập/đăng ký

### 9. **Constants** (`src/constants/`)

- **routes.js**: Định nghĩa đường dẫn routes
- **messages.js**: Thông báo và messages
- **dataLanguage.js**: Dữ liệu đa ngôn ngữ
- **dataSidebar.jsx**: Cấu hình menu sidebar

---

## 🎨 Styling Architecture

### SCSS Modules

Dự án sử dụng SCSS với CSS Modules pattern:

- **_variables.module.scss**: Định nghĩa colors, fonts, spacing, breakpoints
- **_mixins.module.scss**: SCSS mixins cho responsive, flexbox, animations
- **_global.module.scss**: Global styles và resets
- **main.scss**: Import tất cả styles và normalize.css

Mỗi component có file `styles.module.scss` riêng với scoped styles.

### Alias Paths

Vite được cấu hình với path aliases:

```javascript
@           -> src/
@components -> src/components/
@styles     -> src/assets/styles/
@icons      -> src/assets/icons/
@pages      -> src/pages/
@apis       -> src/apis/
@hooks      -> src/hooks/
@contexts   -> src/contexts/
@utils      -> src/utils/
@constants  -> src/constants/
@validations-> src/validations/
```

---

## 🚀 Scripts

```bash
npm run dev      # Chạy development server
npm run build    # Build production
npm run preview  # Preview production build
```

---

## 🔄 Data Flow

1. **User Action** → Component Event Handler
2. **Event Handler** → Context Action hoặc API Service
3. **API Service** → Axios Client → Backend API
4. **Response** → Update Context State
5. **State Change** → Re-render Components
6. **Toast Notification** (nếu cần)

---

## 🔐 Authentication Flow

1. User nhập credentials trong Login page
2. `authService.js` gửi request đến backend
3. Nhận JWT token và user info
4. Lưu token vào cookie (`js-cookie`)
5. Update `UserProvider` context với user info
6. Redirect đến trang phù hợp (admin/user)
7. Axios interceptor tự động thêm token vào mọi request
8. Xử lý refresh token khi token hết hạn

---

## 📦 Features Chính

### Người Dùng
- ✅ Đăng ký / Đăng nhập / Đăng xuất
- ✅ Xem danh sách sản phẩm với filter và search
- ✅ Xem chi tiết sản phẩm với hình ảnh, mô tả, reviews
- ✅ Thêm sản phẩm vào giỏ hàng
- ✅ Quản lý giỏ hàng (thêm, xóa, cập nhật số lượng)
- ✅ Danh sách yêu thích (wishlist)
- ✅ So sánh sản phẩm
- ✅ Đặt hàng và thanh toán
- ✅ Xem lịch sử đơn hàng
- ✅ Đánh giá và review sản phẩm
- ✅ Quản lý profile cá nhân

### Quản Trị
- ✅ Dashboard với thống kê doanh thu, đơn hàng
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý danh mục
- ✅ Quản lý đơn hàng và cập nhật trạng thái
- ✅ Quản lý người dùng
- ✅ Xem biểu đồ thống kê (Recharts)

---

## 🛠 Best Practices

### Component Organization
- Mỗi component trong folder riêng với file component và styles
- Export default component từ file chính
- Styles được scoped với CSS Modules

### State Management
- Global state dùng Context API
- Local state dùng useState
- Side effects dùng useEffect
- Complex state logic dùng useReducer

### API Calls
- Tất cả API calls thông qua service layer
- Error handling tập trung trong axios interceptor
- Loading states được quản lý trong components

### Code Quality
- PropTypes cho type checking
- ErrorBoundary bắt lỗi runtime
- Lazy loading cho routes
- Code splitting tự động với Vite

---

## 📱 Responsive Design

Dự án hỗ trợ responsive trên các breakpoints:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

SCSS mixins được sử dụng cho media queries.

---

## 🔧 Configuration Files

- **vite.config.js**: Cấu hình Vite bundler và path aliases
- **jsconfig.json**: Cấu hình JavaScript IntelliSense
- **package.json**: Dependencies và scripts
- **index.html**: HTML template với root div

---

## 📚 Dependencies Quan Trọng

### Core
- **react, react-dom**: UI library
- **react-router-dom**: Routing
- **vite**: Build tool siêu nhanh

### UI/UX
- **react-icons**: Icon library
- **react-slick, swiper**: Carousels
- **react-inner-image-zoom**: Zoom ảnh sản phẩm
- **react-toastify**: Notifications

### Data & Forms
- **axios**: HTTP client
- **formik, react-hook-form**: Form handling
- **yup**: Validation
- **js-cookie**: Cookie management

### Utilities
- **classnames**: Conditional classNames
- **date-fns**: Date formatting
- **prop-types**: Runtime type checking

### Charts & Visualization
- **recharts**: Biểu đồ thống kê

### Styling
- **sass**: CSS preprocessor
- **normalize.css**: CSS reset

---

## 🎯 Hướng Dẫn Phát Triển

### Thêm Page Mới
1. Tạo folder trong `src/pages/`
2. Tạo component và styles
3. Thêm route vào `src/routers/routers.js`

### Thêm Component Mới
1. Tạo folder trong `src/components/`
2. Tạo `ComponentName.jsx` và `styles.module.scss`
3. Export component

### Thêm API Service Mới
1. Tạo file trong `src/apis/`
2. Import `axiosClient`
3. Export các functions cho CRUD operations

### Thêm Context Mới
1. Tạo file Provider trong `src/contexts/`
2. Tạo Context và Provider component
3. Wrap cần thiết trong `App.jsx`

---

## 📖 Tài Liệu Tham Khảo

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [SCSS](https://sass-lang.com/)

---

## 📞 Support

Để biết thêm thông tin hoặc hỗ trợ, vui lòng liên hệ team phát triển.

---

**Version:** 0.0.0  
**Last Updated:** January 2026
