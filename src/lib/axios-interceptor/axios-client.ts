import axios from "axios";

export const axiosClient = axios.create();

axiosClient.interceptors.request.use(async config => {
  const session = localStorage.getItem("token");

  if (session) {
    config.headers.Authorization = `Bearer ${session}`;
  }

  return config;
});
