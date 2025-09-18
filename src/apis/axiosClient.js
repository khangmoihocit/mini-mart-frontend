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
            originalRequest._retry = true;

            const refreshToken = Cookies.get('token');

            if (!refreshToken) {
                // Nếu không có refresh token, không cần thử lại, báo lỗi luôn
                return Promise.reject(err);
            }

            try {
                const res = await apiPublic.post('/auth/refresh', {
                    token: refreshToken
                });
                
                // Giả sử API trả về token mới trong res.data.token
                const newAccessToken = res.data.result.token; 

                Cookies.set('token', newAccessToken);

                // Cập nhật header cho request ban đầu
                apiPrivate.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Thực hiện lại request ban đầu với token mới
                return apiPrivate(originalRequest);

            } catch (error) {
                // Nếu refresh token thất bại (hết hạn, không hợp lệ), xóa cookie và báo lỗi
                Cookies.remove('token');
                return Promise.reject(error);
            }
        }
        // Với TẤT CẢ các lỗi khác không phải là 401
        return Promise.reject(err);
    }
);

export {apiPublic, apiPrivate};