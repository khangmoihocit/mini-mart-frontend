import { apiPublic } from '@apis/axiosClient';

export default class userService {
    static add = async body => await apiPublic.post('/api/v1/users', body);

}
