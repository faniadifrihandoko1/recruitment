import { queryClient } from "@/component/layout/theme-wraper";
import { getApi } from "@/lib/api/endpoint";
import { axiosInterceptor } from "@/lib/axios-interceptor";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type ResponseCreateProject = {
  status: boolean;
  code: number;
  message: string;
  data: DataCreateProject;
};

export type DataCreateProject = {
  id: number;
  project_name: string;
  project_description: string;
  tenant_id: number;
  created_date: Date;
  created_by: null;
  updated_date: null;
  updated_by: null;
  deleted_date: null;
  deleted_by: null;
};

export type PayloadCreateProject = {
  project_name: string;
  project_description: string;
};

export const useCreateProject = () =>
  useMutation<
    ResponseCreateProject,
    AxiosError<ResponseCreateProject>,
    PayloadCreateProject
  >({
    mutationFn: async data => {
      const res = await axiosInterceptor.post<ResponseCreateProject>(
        getApi("project"),
        data
      );
      if (res.data.status && res.data.code === 201) {
        queryClient.invalidateQueries({ queryKey: ["GET_PROJECTS"] });

        return res.data;
      }

      throw new Error(res.data.message);
    },
    mutationKey: ["CREATE_PROJECT"],
  });
