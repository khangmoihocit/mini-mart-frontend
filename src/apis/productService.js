import { apiPrivate, apiPublic } from '@apis/axiosClient';

export default class productService {
    static create = async (formData) => {
        return await apiPrivate.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    static search = async (pageNo, pageSize, keyword) => {
        return await apiPrivate.get('/products/search', {
            params: { 'pageNo': pageNo, 'pageSize': pageSize, 'keyword': keyword }
        });
    };
}
