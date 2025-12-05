import { getApi } from "@/lib/api/endpoint";
import { API_TAGS } from "@/lib/api/tags";
import { axiosClient } from "@/lib/axios-interceptor/axios-client";
import { MetaPagination } from "@/types/general-type";
import { GetVacanciesParams, VacanciesInterface } from "@/types/vacancies";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type ResponseGetVacancies = {
  status: boolean;
  code: number;
  message: string;
  data: VacanciesInterface[];
  meta: MetaPagination;
};

export type ResponseGetVacanciesById = {
  status: boolean;
  code: number;
  message: string;
  data: VacanciesInterface;
};

export const useGetVacancies = (params?: GetVacanciesParams) => {
  const { page = 1, limit = 10, project_id } = params || {};

  return useQuery<ResponseGetVacancies, AxiosError<ResponseGetVacancies>>({
    queryFn: async () => {
      const res = await axiosClient.post<ResponseGetVacancies>(
        getApi("listVacancy"),
        {
          project_id: project_id,
        },
        {
          params: {
            page,
            limit,
          },
        }
      );

      return res.data;
    },
    queryKey: [API_TAGS.VACANCIES, page, limit, project_id],
  });
};

// export const useGetProjectsServer = (params?: GetProjectsParams) => {
//   const { page = 1, limit = 10 } = params || {};

//   return useQuery<ResponseGetProjects, AxiosError<ResponseGetProjects>>({
//     queryFn: async () => {
//       const res = await getProjectAction({ page, limit });

//       // return res.data;
//       return res;
//     },
//     queryKey: [API_TAGS.PROJECTS, page, limit],
//   });
// };

// export const useGetProjectById = (id: number) => {
//   return useQuery<ResponseGetProjectById, AxiosError<ResponseGetProjectById>>({
//     queryFn: async () => {
//       const res = await axiosClient.get<ResponseGetProjectById>(`${getApi("project")}/${id}`);

//       return res.data;
//     },
//     queryKey: [API_TAGS.PROJECTS, id],
//   });
// };

export const useGetVacanciesById = (id: number) => {
  return useQuery<
    ResponseGetVacanciesById,
    AxiosError<ResponseGetVacanciesById>
  >({
    queryFn: async () => {
      const res = await axiosClient.get<ResponseGetVacanciesById>(
        `${getApi("vacancy")}/${id}`
      );

      return res.data;
    },
    queryKey: [API_TAGS.VACANCIES, id],
  });
};
