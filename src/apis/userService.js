import axiosClient from '@apis/axiosClient';

export default class userService {
    static add = async body => await axiosClient.post('/api/v1/users', body);

}
