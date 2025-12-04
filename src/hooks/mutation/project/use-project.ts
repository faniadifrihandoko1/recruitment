import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/app/(actions)/project";
import { queryClient } from "@/component/layout/theme-wraper";
import { getApi } from "@/lib/api/endpoint";
import { API_TAGS } from "@/lib/api/tags";
import { axiosClient } from "@/lib/axios-interceptor/axios-client";
import {
  PayloadCreateProject,
  PayloadUpdateProject,
  ProjectInterface,
  ResponseMutateProject,
} from "@/types/project";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export type ResponseCreateProject = {
  status: boolean;
  code: number;
  message: string;
  data: ProjectInterface;
};

export const useCreateProject = () =>
  useMutation<
    ResponseCreateProject,
    AxiosError<ResponseCreateProject>,
    PayloadCreateProject
  >({
    mutationFn: async data => {
      const res = await axiosClient.post<ResponseCreateProject>(
        getApi("project"),
        data
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_TAGS.PROJECTS] });
    },
    mutationKey: ["CREATE_PROJECT"],
  });

export const useCreateProjectServer = () =>
  useMutation<
    ResponseMutateProject,
    AxiosError<ResponseMutateProject>,
    PayloadCreateProject
  >({
    mutationFn: data => createProjectAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_TAGS.PROJECTS] });
    },
    mutationKey: ["CREATE_PROJECT_SERVER"],
  });

export const useUpdateProject = () =>
  useMutation<
    ResponseMutateProject,
    AxiosError<ResponseMutateProject>,
    PayloadUpdateProject
  >({
    mutationFn: async (data: PayloadUpdateProject) => {
      const res = await axiosClient.patch<ResponseCreateProject>(
        getApi("project"),
        data
      );

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_TAGS.PROJECTS] });
    },
    mutationKey: ["UPDATE_PROJECT"],
  });

export const useUpdateProjectServer = () =>
  useMutation<
    ResponseMutateProject,
    AxiosError<ResponseMutateProject>,
    PayloadUpdateProject
  >({
    mutationFn: data => updateProjectAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_TAGS.PROJECTS] });
    },
    mutationKey: ["UPDATE_PROJECT_SERVER"],
  });

export const useDeleteProject = () =>
  useMutation<ResponseMutateProject, AxiosError<ResponseMutateProject>, number>(
    {
      mutationFn: async (id: number) => {
        const res = await axiosClient.delete<ResponseMutateProject>(
          `${getApi("project")}/${id}`
        );

        return res.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [API_TAGS.PROJECTS] });
      },
      mutationKey: ["DELETE_DATA_PERIOD"],
    }
  );

export const useDeleteProjectServer = () =>
  useMutation<ResponseMutateProject, AxiosError<ResponseMutateProject>, number>(
    {
      mutationFn: id => deleteProjectAction(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [API_TAGS.PROJECTS] });
      },
      mutationKey: ["DELETE_PROJECT_SERVER"],
    }
  );
