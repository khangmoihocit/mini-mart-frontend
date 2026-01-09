import { apiPrivate, apiPublic } from '@apis/axiosClient';

export default class authService {
    static login = async body => {
        return await apiPublic.post('/auth/log-in', body);
    };

    static fakeData = async () => {
        return await apiPrivate.post('/fake-data/products/quick');
    }

    static fakeDataV2 = async () => {
        return await apiPrivate.post('/fake-data/all?userCount=30&productCount=50&orderCount=100');
    }
}
