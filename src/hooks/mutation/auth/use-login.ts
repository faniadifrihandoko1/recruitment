import { getApi } from "@/lib/api/endpoint";
import { axiosInterceptor } from "@/lib/axios-interceptor";
import { setSession } from "@/lib/session";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const enpointLogin = getApi("login");

export type Data = {
  token: string;
  user: {
    username: string;
    email: string;
    role: string;
    tenant_id: number;
  };
};

export type ResponseLogin = {
  status: boolean;
  code: number;
  message: string;
  data: Data;
};

export type PayloadLogin = {
  username: string;
  password: string;
};

export const useLogin = () => {
  return useMutation<ResponseLogin, AxiosError<ResponseLogin>, PayloadLogin>({
    mutationFn: async data => {
      const res = await axiosInterceptor.post<ResponseLogin>(
        enpointLogin,
        data
      );

      if (res.data.status && res.data.code === 200) {
        await setSession(res.data.data.token);
        localStorage.setItem("token", res.data.data.token);
      }

      return res.data;
    },
    mutationKey: ["login"],
  });
};
