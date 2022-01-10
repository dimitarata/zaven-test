import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_APIBASEURL,
});

function setupAxiosInterceptors(axios: AxiosInstance) {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (!config?.headers?.Authorization && config?.headers) {
        config.headers.Authorization = Cookies.get("token");
      }

      return config;
    },
    (err: AxiosError) => Promise.reject(err)
  );
}

setupAxiosInterceptors(customAxios);

export default customAxios;
