// axiosInstance.js
import axios from "axios";

const API_BASE_URL = "http://0.0.0.0:8000";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 쿠키로 리프레시 토큰 전송
});

// 요청 인터셉터 – access token 붙이기
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 – access token 만료 시 재발급
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh")
    ) {
      originalRequest._retry = true;
      try {
        // 리프레시 토큰으로 새로운 액세스 토큰 발급 요청
        const res = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );
        console.log(res);
        const newAccessToken = res.data.access_token;
        sessionStorage.setItem("access_token", newAccessToken);

        // 새로운 토큰으로 원래 요청 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 리프레시도 실패한 경우 로그아웃 처리 등
        console.error(
          "리프레시 토큰 만료 또는 오류:",
          refreshError.response.data.detail
        );
        sessionStorage.removeItem("access_token");
        // window.location.href = "/login"; // 또는 에러 처리
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
