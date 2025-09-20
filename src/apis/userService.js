import { apiPrivate, apiPublic } from '@apis/axiosClient';

export default class userService {

    static getAll = async () => await apiPrivate.get('/users');

    static getMyInfo = async () => await apiPrivate.get(`/users/myInfo`);

    static add = async body => await apiPublic.post('/users', body);

    static delete = async id => await apiPrivate.delete(`/users/${id}`);
    

}
