import { apiPrivate, apiPublic } from '@apis/axiosClient';

export default class categoryService {
    static create = async body => {
        return await apiPrivate.post('/categories', body);
    };

    static getAll = async () => {
        return await apiPublic.get('/categories');
    };
}
