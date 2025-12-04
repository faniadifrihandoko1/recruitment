export interface ProjectInterface {
  id: number;
  name: string;
  description: string;
  tenant_id?: number;
  created_date?: Date;
  created_by?: Date;
  updated_date?: Date;
  updated_by?: string;
  deleted_date?: Date;
  deleted_by?: string;
}

export interface PayloadCreateProject {
  name: string;
  description: string;
}

export interface PayloadUpdateProject {
  id: number;
  name: string;
  description: string;
}

export interface GetProjectsParams {
  page?: number;
  limit?: number;
}

export interface ResponseMutateProject {
  status: boolean;
  code: number;
  message: string;
}
