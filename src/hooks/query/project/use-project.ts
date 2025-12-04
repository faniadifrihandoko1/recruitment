import { getProjectAction } from "@/app/(actions)/project";
import { getApi } from "@/lib/api/endpoint";
import { API_TAGS } from "@/lib/api/tags";
import { axiosClient } from "@/lib/axios-interceptor/axios-client";
import { MetaPagination } from "@/types/general-type";
import { GetProjectsParams, ProjectInterface } from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type ResponseGetProjects = {
  status: boolean;
  code: number;
  message: string;
  data: ProjectInterface[];
  meta: MetaPagination;
};

export const useGetProjects = (params?: GetProjectsParams) => {
  const { page = 1, limit = 10 } = params || {};

  return useQuery<ResponseGetProjects, AxiosError<ResponseGetProjects>>({
    queryFn: async () => {
      const res = await axiosClient.get<ResponseGetProjects>(
        getApi("project"),
        {
          params: {
            page,
            limit,
          },
        }
      );

      return res.data;
    },
    queryKey: [API_TAGS.PROJECTS, page, limit],
  });
};

export const useGetProjectsServer = (params?: GetProjectsParams) => {
  const { page = 1, limit = 10 } = params || {};

  return useQuery<ResponseGetProjects, AxiosError<ResponseGetProjects>>({
    queryFn: async () => {
      const res = await getProjectAction({ page, limit });

      return res.data;
    },
    queryKey: [API_TAGS.PROJECTS, page, limit],
  });
};
