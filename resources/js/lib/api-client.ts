import { LOGIN_ROUTE } from '@/router/routes';
import { TOKEN_KEY, API_BASE_URL, USER_KEY } from '@/utils/constants';
import Axios from 'axios';

const axiosInstance = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // if (config.data) {
    //   config.data = toSnakeCase(config.data);
    // }
    // if (config.params) {
    //   config.params = toSnakeCase(config.params);
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.withXSRFToken = true;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(TOKEN_KEY);
      const searchParams = new URLSearchParams();
      const redirectTo = searchParams.get('redirectTo');
      window.location.href = `${LOGIN_ROUTE}?redirectTo=${redirectTo}`;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
