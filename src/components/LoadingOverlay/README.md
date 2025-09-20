# LoadingOverlay Component - Hướng dẫn sử dụng

## Giới thiệu

`LoadingOverlay` là một hệ thống component loading hoàn chỉnh với nhiều biến thể khác nhau để phù hợp với mọi tình huống trong ứng dụng.

## Các Component

### 1. LoadingOverlay (Chính)
- **Mục đích**: Loading overlay cho toàn bộ khu vực hoặc standalone
- **Sử dụng**: Khi cần che phủ toàn bộ content trong lúc loading

### 2. InlineLoading  
- **Mục đích**: Loading nhỏ gọn hiển thị inline với text
- **Sử dụng**: Trong câu, bên cạnh label, trạng thái nhỏ

### 3. LoadingButton
- **Mục đích**: Button với state loading tích hợp
- **Sử dụng**: Các action button (Lưu, Xóa, Gửi, etc.)

### 4. SkeletonLoader
- **Mục đích**: Hiển thị layout giả trong lúc loading data
- **Sử dụng**: Loading cho tables, lists, cards

## Import

```jsx
import LoadingOverlay, { 
    InlineLoading, 
    LoadingButton, 
    SkeletonLoader 
} from '@/components/LoadingOverlay/LoadingOverlay';
```

## Cách sử dụng

### LoadingOverlay

#### Standalone (không có children)
```jsx
<LoadingOverlay 
    isLoading={true} 
    message="Đang tải dữ liệu..."
    size="medium"
/>
```

#### Overlay (có children - che phủ content)
```jsx
<LoadingOverlay 
    isLoading={loading} 
    message="Đang xử lý..."
    size="large"
>
    <div>Content sẽ bị che khi loading</div>
</LoadingOverlay>
```

**Props:**
- `isLoading`: boolean - Hiển thị loading hay không
- `message`: string - Text hiển thị (optional)
- `size`: "small" | "medium" | "large" - Kích thước spinner
- `children`: ReactNode - Content để overlay (optional)

### InlineLoading

```jsx
<p>
    Trạng thái: <InlineLoading message="Đang xử lý..." size="small" />
</p>
```

**Props:**
- `message`: string - Text hiển thị (optional)
- `size`: "small" | "medium" | "large" - Kích thước

### LoadingButton

```jsx
<LoadingButton 
    loading={isSubmitting}
    loadingText="Đang lưu..."
    onClick={handleSave}
    style={{ background: '#3b82f6' }}
>
    Lưu dữ liệu
</LoadingButton>
```

**Props:**
- `loading`: boolean - Trạng thái loading
- `loadingText`: string - Text khi loading (optional)
- `onClick`: function - Handler click
- `children`: ReactNode - Text/content button
- `style`: object - Custom styles
- `className`: string - CSS class
- `...rest`: Các props khác của button

### SkeletonLoader

```jsx
{loading ? (
    <SkeletonLoader rows={5} columns={4} />
) : (
    <div>Actual content</div>
)}
```

**Props:**
- `rows`: number - Số hàng (default: 3)
- `columns`: number - Số cột (default: 1)

## Các kích thước

- **small**: Spinner 20px, phù hợp inline
- **medium**: Spinner 32px, phù hợp content vừa
- **large**: Spinner 48px, phù hợp overlay lớn

## Ví dụ thực tế

### 1. Loading toàn trang
```jsx
const [loading, setLoading] = useState(false);

if (loading && data.length === 0) {
    return (
        <LoadingOverlay 
            isLoading={true} 
            message="Đang tải danh sách người dùng..."
            size="large"
        />
    );
}
```

### 2. Loading với content hiện có
```jsx
<LoadingOverlay 
    isLoading={loading && data.length > 0} 
    message="Đang cập nhật..."
    size="medium"
>
    <Table data={data} />
</LoadingOverlay>
```

### 3. Button với loading
```jsx
const [saving, setSaving] = useState(false);

const handleSave = async () => {
    setSaving(true);
    try {
        await saveData();
    } finally {
        setSaving(false);
    }
};

<LoadingButton 
    loading={saving}
    loadingText="Đang lưu..."
    onClick={handleSave}
>
    Lưu dữ liệu
</LoadingButton>
```

### 4. Skeleton cho table
```jsx
{isLoading ? (
    <SkeletonLoader rows={5} columns={6} />
) : (
    <table>
        {/* Table content */}
    </table>
)}
```

## Styling

Có thể custom CSS qua:
- CSS modules (styles.module.scss)
- Inline styles qua prop `style`
- CSS classes qua prop `className`

## Best Practices

1. **Sử dụng đúng component**: 
   - Overlay cho loading toàn bộ khu vực
   - InlineLoading cho trạng thái nhỏ
   - LoadingButton cho actions
   - Skeleton cho loading data structure

2. **Message rõ ràng**: 
   - "Đang tải dữ liệu..."
   - "Đang lưu..."
   - "Đang xử lý yêu cầu..."

3. **Size phù hợp**:
   - small: inline, status nhỏ
   - medium: content thường
   - large: loading toàn trang

4. **Accessibility**: 
   - Component hỗ trợ screen readers
   - Respect prefers-reduced-motion

## Demo

Xem `LoadingDemo.jsx` để test tất cả variants và cách sử dụng.