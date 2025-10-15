import axios from 'axios';
import Cookies from 'js-cookie';

// respone.data.result
const apiPublic = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

const apiPrivate = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // gửi kèm cookie lên server(refresh token)
});

//config gửi token lên server
apiPrivate.interceptors.request.use(
    async config => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

//config lỗi khi token hết hạn refresh token
apiPrivate.interceptors.response.use(
    res => {
        return res;
    },
    async err => {
        const originalRequest = err.config;

        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await apiPublic.post('/auth/refresh');
                const newAccessToken = res.data.result.accessToken;
                Cookies.set('token', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return apiPrivate(originalRequest);

            } catch (error) {
                console.log('Lỗi khi làm mới token:', error);
                Cookies.remove('token');
                return Promise.reject(error);
            }
        }
        return Promise.reject(err);
    }
);

export {apiPublic, apiPrivate};