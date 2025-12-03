import { getSession } from "@/lib/session";
import axios from "axios";

export const axiosInterceptor = axios.create();

axiosInterceptor.interceptors.request.use(config => {
  const session = getSession() as { token?: string } | null;
  const token = session?.token;

  if (token) {
    if (!config.headers) {
      (config as any).headers = {};
    }

    (config.headers as any).Authorization = `Bearer ${token}`;
  }

  return config;
});
