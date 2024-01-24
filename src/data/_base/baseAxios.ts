import axios, { AxiosInstance, AxiosResponse } from 'axios';

const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: 'https://', // 여기에 실제 API 베이스 URL 입력
  });

  // 요청 인터셉터
  instance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const storedUser = localStorage.getItem('user');

    if (!storedUser) return config;

    const { accessToken } = JSON.parse(storedUser);

    if (accessToken) {
      config.headers['Nonghub'] = `Bearer ${accessToken}`;
    }
    return config;
  });

  // 응답 인터셉터
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const newToken: string = await requestNewToken(refreshToken);

            localStorage.setItem(
              'user',
              JSON.stringify({
                accessToken: newToken,
                refreshToken: refreshToken,
              }),
            );

            return instance(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

const requestNewToken = async (refreshToken: string) => {
  // 새로운 Axios 인스턴스를 사용하여 리프레시 토큰 요청
  const response = await axios.post(
    'https://', // 여기에 실제 API 베이스 URL 입력
    {
      refresh: refreshToken,
    },
  );
  return response.data.access as string;
};

const baseAxios = createAxiosInstance();

export default baseAxios;
