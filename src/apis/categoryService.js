import { apiPrivate, apiPublic } from '@apis/axiosClient';

export default class categoryService {
    static getAllCategories = async () => {
        return await apiPublic.get('/categories');
    }

    static createCategory = async body => {
        return await apiPrivate.post('/categories', body);
    }
}
