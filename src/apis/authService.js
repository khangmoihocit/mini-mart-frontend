import api from '@apis/axiosClient';

const login = async body => {
    return await api.post('/auth/log-in', body);
};

export { login };
