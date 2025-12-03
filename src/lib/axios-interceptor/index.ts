import axios from "axios";

export const axiosInterceptor = axios.create();

axiosInterceptor.interceptors.request.use(async config => {
  const session = localStorage.getItem("token");

  if (session) {
    config.headers.Authorization = `Bearer ${session}`;
  }

  return config;
});
