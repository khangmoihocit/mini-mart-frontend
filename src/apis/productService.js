import { apiPrivate, apiPublic } from '@apis/axiosClient';

export default class productService {
    static create = async (formData) => {
        return await apiPrivate.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };
}
