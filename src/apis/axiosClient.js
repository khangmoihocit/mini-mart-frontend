import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8081/mini-mart',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

//config gửi token lên server
axiosClient.interceptors.request.use(
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
axiosClient.interceptors.response.use(
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
                const res = await axiosClient.post('/auth/refresh', {
                    token: refreshToken
                });

                const newAccessToken = res.data.result.token; // Cập nhật đường dẫn đến token mới

                Cookies.set('token', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Thực hiện lại request ban đầu với token mới
                return axiosClient(originalRequest);

            } catch (error) {
                // Nếu refresh token thất bại (hết hạn, không hợp lệ), xóa cookie và báo lỗi
                Cookies.remove('token');
                Cookies.remove('refreshToken');
                return Promise.reject(error);
            }
        }
        // Với TẤT CẢ các lỗi khác không phải là 401 (như 400, 500, lỗi mạng...),
        // chúng ta phải "ném" (reject) lỗi đó ra ngoài để khối .catch()
        return Promise.reject(err);
    }
);

export default axiosClient;