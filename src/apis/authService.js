import { apiPrivate, apiPublic } from '@apis/axiosClient';

export default class authService {
    static login = async body => {
        return await apiPublic.post('/auth/log-in', body);
    };

    static fakeData = async () => {
        return await apiPrivate.post('/fake-data/products/quick');
    }
}
