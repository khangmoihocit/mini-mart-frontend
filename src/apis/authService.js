import { apiPublic } from '@apis/axiosClient';

export default class authService {
    static login = async body => {
        return await apiPublic.post('/auth/log-in', body);
    };
}
