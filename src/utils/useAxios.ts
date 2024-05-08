import axios from "axios";

// 初始化 axios
const request = axios.create({
  withCredentials: false,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.warn("axios error:", error);
    return Promise.reject(error);
  }
);

// 回复拦截器
request.interceptors.response.use(
  (response) => {
    return response.data || {};
  },
  (error) => {
    console.warn("axios error:", error);
    return Promise.reject(error.message);
  }
);

/** post 请求 */
export const post = (url: string, data: unknown) => {
  return request.post(url, data);
};

/** get 请求 */
export const get = (url: string) => {
  return request.get(url);
};
