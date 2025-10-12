import { apiPrivate, apiPublic } from '@apis/axiosClient';

export default class userService {
    static add = async body => await apiPublic.post('/users', body);

    static getAll = async () => await apiPrivate.get('/users');

    static getMyInfo = async () => await apiPrivate.get(`/users/myInfo`);

    static delete = async id => await apiPrivate.delete(`/users/${id}`);
    
    static update = async (id, body) => await apiPrivate.put(`/users/${id}`, body);

}
