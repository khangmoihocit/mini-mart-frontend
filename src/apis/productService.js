import { apiPrivate, apiPublic } from '@apis/axiosClient';

export default class productService {
    static create = async (formData) => {
        return await apiPrivate.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    static getAll = async () => {
        return await apiPublic.get(`/products`);
    };

    static search = async (pageNo, pageSize, keyword) => {
        return await apiPublic.get('/products/search', {
            params: { 'pageNo': pageNo, 'pageSize': pageSize, 'keyword': keyword }
        });
    };

    static getById = async (id) => {
        return await apiPublic.get(`/products/${id}`);
    };

    static update = async (formData, id) => {
        return await apiPrivate.put(`/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    static updateImages = async (formData, id) => {
        return await apiPrivate.post(`/products/update-images/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    static delete = async (id) => {
        return await apiPrivate.delete(`/products/${id}`);
    }
}
