import { apiPublic } from '@apis/axiosClient';

export default class authService {
    static login = async body => {
        return await apiPublic.post('/api/v1/auth/log-in', body);
    };
}
