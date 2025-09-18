import { apiPrivate, apiPublic } from '@apis/axiosClient';

export default class userService {
    static add = async body => await apiPublic.post('/users', body);

    static getAll = async () => await apiPrivate.get('/users');
}
