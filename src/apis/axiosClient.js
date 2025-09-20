import axios from 'axios';
import Cookies from 'js-cookie';

const apiPublic = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const apiPrivate = axios.create({
    baseURL: 'http://localhost:8081/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Biến để track refresh token request đang diễn ra
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else {
            resolve(token);
        }
    });
    
    failedQueue = [];
};

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

        // Chỉ xử lý logic đặc biệt cho lỗi 401 (refresh token)
        if (err.response && err.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // Nếu đang refresh token, thêm request vào queue
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return apiPrivate(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = Cookies.get('token');

            if (!refreshToken) {
                // Nếu không có refresh token, process queue với error
                processQueue(err, null);
                isRefreshing = false;
                return Promise.reject(err);
            }

            try {
                const res = await apiPublic.post('/auth/refresh', {
                    token: refreshToken
                });
                
                const newAccessToken = res.data.result.token; 

                Cookies.set('token', newAccessToken);

                // Cập nhật header cho tất cả request
                apiPrivate.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Process tất cả request trong queue với token mới
                processQueue(null, newAccessToken);

                return apiPrivate(originalRequest);

            } catch (error) {
                // Nếu refresh token thất bại, process queue với error
                processQueue(error, null);
                Cookies.remove('token');
                
                // Redirect về login page
                window.location.href = '/login';
                
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }
        // Với TẤT CẢ các lỗi khác không phải là 401
        return Promise.reject(err);
    }
);

export {apiPublic, apiPrivate};