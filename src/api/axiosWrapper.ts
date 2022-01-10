import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import Cookies from "js-cookie";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_APIBASEURL,
});


function setupAxiosInterceptors(axios: AxiosInstance) {
  axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = Cookies.get("token");
      if (!config?.headers?.Authorization && config?.headers && token ) {
        config.headers.Authorization = token;
      }

      return config;
    },
    (err: AxiosError) => Promise.reject(err)
  );
}

setupAxiosInterceptors(customAxios);

export default customAxios;
