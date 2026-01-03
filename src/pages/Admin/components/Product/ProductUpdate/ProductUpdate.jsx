import React, { useState, useEffect, useContext } from 'react';
import styles from './styles.module.scss';
import categoryService from '@apis/categoryService';
import productService from '@apis/productService';
import Button from '@components/Button/Button';
import { formatErrorMessage } from '@/utils/helpers';
import { AdminContext } from '@/contexts/AdminProvider';
import { toast } from 'react-toastify';

const ProductUpdate = () => {
    const { selectedProductId, setType } = useContext(AdminContext);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        salePrice: '',
        description: '',
        stockQuantity: 0,
        categoryId: '',
    });

    const [existingImages, setExistingImages] = useState([]);
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const baseUrlImg = "http://localhost:8081/images/";

    useEffect(() => {
        fetchCategories();
        if (selectedProductId) {
            fetchProductData();
        }
    }, [selectedProductId]);

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getAllCategories();
            if (response.data.code === 0) {
                setCategories(response.data.result);
            }
        } catch (error) {
            toast.error('Không thể tải danh mục');
        }
    };

    const fetchProductData = async () => {
        try {
            setLoadingData(true);
            const response = await productService.getById(selectedProductId);
            if (response.data.code === 0) {
                const product = response.data.result;
                setFormData({
                    name: product.name,
                    price: product.price,
                    salePrice: product.salePrice || '',
                    description: product.description,
                    stockQuantity: product.stockQuantity,
                    categoryId: product.category.id,
                });
                setExistingImages(product.images || []);
            }
        } catch (error) {
            toast.error(formatErrorMessage(error));
        } finally {
            setLoadingData(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(prev => [...prev, ...files]);
        
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...previews]);
        
        e.target.value = '';
    };

    const removeExistingImage = (imageId) => {
        setExistingImages(prev => prev.filter(img => img.id !== imageId));
    };

    const removeNewImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        const preview = imagePreviews[index];
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        URL.revokeObjectURL(preview);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name.trim()) {
            toast.error('Tên sản phẩm không được để trống');
            return;
        }
        if (!formData.price || formData.price < 0) {
            toast.error('Giá sản phẩm phải lớn hơn hoặc bằng 0');
            return;
        }
        if (!formData.description.trim()) {
            toast.error('Mô tả sản phẩm không được để trống');
            return;
        }
        if (!formData.categoryId) {
            toast.error('Vui lòng chọn danh mục sản phẩm');
            return;
        }

        try {
            setLoading(true);
            
            // Update thông tin sản phẩm
            const productData = new FormData();
            productData.append('name', formData.name);
            productData.append('price', formData.price);
            if (formData.salePrice) {
                productData.append('salePrice', formData.salePrice);
            }
            productData.append('description', formData.description);
            productData.append('stockQuantity', formData.stockQuantity);
            productData.append('categoryId', formData.categoryId);

            await productService.update(productData, selectedProductId);
            
            // Update ảnh nếu có thay đổi
            if (images.length > 0 || existingImages.length > 0) {
                const imageData = new FormData();
                
                // Thêm file ảnh mới
                images.forEach(image => {
                    imageData.append('files', image);
                });
                
                // Thêm ID ảnh cũ cần giữ lại
                existingImages.forEach(img => {
                    imageData.append('keepImageIds', img.id);
                });
                
                await productService.updateImages(imageData, selectedProductId);
            }

            toast.success('Cập nhật sản phẩm thành công');
            setType('product-list');
        } catch (error) {
            toast.error(formatErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    if (loadingData) {
        return <div className={styles.productUpdate}>Đang tải...</div>;
    }

    return (
        <div className={styles.productUpdate}>
            <h2 style={{textAlign:'center'}}>Cập nhật sản phẩm</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Tên sản phẩm <span className={styles.required}>*</span></label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Nhập tên sản phẩm"
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="price">Giá sản phẩm <span className={styles.required}>*</span></label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="salePrice">Giá khuyến mãi</label>
                        <input
                            type="number"
                            id="salePrice"
                            name="salePrice"
                            value={formData.salePrice}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="stockQuantity">Số lượng tồn kho</label>
                        <input
                            type="number"
                            id="stockQuantity"
                            name="stockQuantity"
                            value={formData.stockQuantity}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="categoryId">Danh mục <span className={styles.required}>*</span></label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                        >
                            <option value="">Chọn danh mục</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description">Mô tả <span className={styles.required}>*</span></label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Nhập mô tả sản phẩm"
                        rows="4"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Hình ảnh sản phẩm</label>
                    {(existingImages.length > 0 || imagePreviews.length > 0) && (
                        <div className={styles.imagePreviews}>
                            {existingImages.map((image) => (
                                <div key={image.id} className={styles.imagePreview}>
                                    <img src={`${baseUrlImg}${image.imageUrl}`} alt="Product" />
                                    <button
                                        type="button"
                                        className={styles.removeBtn}
                                        onClick={() => removeExistingImage(image.id)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            {imagePreviews.map((preview, index) => (
                                <div key={`new-${index}`} className={styles.imagePreview}>
                                    <img src={preview} alt={`New ${index + 1}`} />
                                    <button
                                        type="button"
                                        className={styles.removeBtn}
                                        onClick={() => removeNewImage(index)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="images">Thêm hình ảnh</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        onChange={handleImageChange}
                        multiple
                        accept="image/*"
                    />
                </div>

                <div className={styles.formActions}>
                    <Button
                        type="submit"
                        content={loading ? 'Đang xử lý...' : 'Cập nhật sản phẩm'}
                        variant="primary"
                        disabled={loading}
                    />
                </div>
            </form>
        </div>
    );
};

export default ProductUpdate;