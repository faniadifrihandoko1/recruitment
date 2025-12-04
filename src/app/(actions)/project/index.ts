"use server";

import { getApi } from "@/lib/api/endpoint";
import { API_TAGS } from "@/lib/api/tags";
import { axiosServer } from "@/lib/axios-interceptor/axios-server";
import {
  GetProjectsParams,
  PayloadCreateProject,
  PayloadUpdateProject,
} from "@/types/project";
import { revalidateTag } from "next/cache";

export const createProjectAction = async (payload: PayloadCreateProject) => {
  const res = await axiosServer.post(getApi("project"), payload);

  revalidateTag(API_TAGS.PROJECTS);

  return res.data;
};

export const updateProjectAction = async (payload: PayloadUpdateProject) => {
  const res = await axiosServer.patch(getApi("project"), payload);

  revalidateTag(API_TAGS.PROJECTS);

  return res.data;
};

export const deleteProjectAction = async (id: number) => {
  const res = await axiosServer.delete(`${getApi("project")}/${id}`);

  revalidateTag(API_TAGS.PROJECTS);

  return res.data;
};

export const getProjectAction = async (params?: GetProjectsParams) => {
  const { page = 1, limit = 10 } = params || {};

  const res = await axiosServer.get(getApi("project"), {
    params: {
      page,
      limit,
    },
  });

  return res.data;
};
