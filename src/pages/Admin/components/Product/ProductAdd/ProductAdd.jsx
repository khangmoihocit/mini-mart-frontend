import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import categoryService from '@apis/categoryService';
import productService from '@apis/productService';
import Button from '@components/Button/Button';
import { formatErrorMessage } from '@/utils/helpers';
import { toast } from 'react-toastify';
const ProductAdd = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        salePrice: '',
        description: '',
        stockQuantity: 0,
        categoryId: '',
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Thêm ảnh mới vào danh sách hiện có
        setImages(prev => [...prev, ...files]);

        // Create previews cho ảnh mới và thêm vào danh sách preview
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
        
        e.target.value = '';
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newPreviews);
        URL.revokeObjectURL(imagePreviews[index]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
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
            const submitData = new FormData();
            submitData.append('name', formData.name);
            submitData.append('price', formData.price);
            if (formData.salePrice) {
                submitData.append('salePrice', formData.salePrice);
            }
            submitData.append('description', formData.description);
            submitData.append('stockQuantity', formData.stockQuantity);
            submitData.append('categoryId', formData.categoryId);
            
            images.forEach(image => {
                submitData.append('images', image);
            });

            await productService.create(submitData);
            toast.success('Thêm sản phẩm thành công');
            
            // Reset form
            setFormData({
                name: '',
                price: '',
                salePrice: '',
                description: '',
                stockQuantity: 0,
                categoryId: '',
            });
            setImages([]);
            setImagePreviews([]);
        } catch (error) {
            toast.error(formatErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
            <div className={styles.productAdd}>
            <h2 style={{textAlign: 'center'}}>Thêm sản phẩm mới</h2>
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
                    <label htmlFor="images">Hình ảnh</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        onChange={handleImageChange}
                        multiple
                        accept="image/*"
                    />
                </div>

                {imagePreviews.length > 0 && (
                    <div className={styles.imagePreviews}>
                        {imagePreviews.map((preview, index) => (
                            <div key={index} className={styles.imagePreview}>
                                <img src={preview} alt={`Preview ${index + 1}`} />
                                <button
                                    type="button"
                                    className={styles.removeBtn}
                                    onClick={() => removeImage(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className={styles.formActions}>
                    <Button
                        type="submit"
                        content={loading ? 'Đang xử lý...' : 'Thêm sản phẩm'}
                        variant="primary"
                        disabled={loading}
                    />
                </div>
            </form>
        </div>
    );
};

export default ProductAdd;