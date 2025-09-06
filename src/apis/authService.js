import axiosClient from '@apis/axiosClient';

const login = async body => {
    return await axiosClient.post('/auth/log-in', body);
};

export { login };
