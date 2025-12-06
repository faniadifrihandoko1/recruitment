export interface VacanciesInterface {
  id: number;
  name: string;
  start: string;
  end: string;
  status: VacancyStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type JobDescriptionItem = {
  title: string;
};

export type JobRequirementType = "MUST_HAVE" | "NICE_TO_HAVE";
export type VacancyType = "fulltime" | "parttime" | "contract";
export type VacancyStatus = "draft" | "open" | "closed" | "cancelled";

export type JobRequirementItem = {
  title: string;
  type: JobRequirementType;
};

export interface PayloadCreateVacancies {
  project_id: number;
  name: string;
  description?: string;
  job_description?: JobDescriptionItem[];
  job_requirement?: JobRequirementItem[];
  type: VacancyType;
  location?: string;
  min_salary: number;
  max_salary?: number;
  openings: number;
  status: VacancyStatus;
  open_date?: string;
  close_date?: string;
}

export interface PayloadDeleteVacancies {
  id: number;
}

export interface PayloadUpdateProject {
  id: number;
  project_id: number;
  name: string;
  description?: string;
  job_description?: JobDescriptionItem[];
  job_requirement?: JobRequirementItem[];
  type: VacancyType;
  location?: string;
  min_salary: number;
  max_salary?: number;
  openings: number;
  status: VacancyStatus;
  open_date?: string;
  close_date?: string;
}

export interface GetVacanciesParams {
  page?: number;
  limit?: number;
  project_id?: number;
}

export interface ResponseMutateVacancies {
  status: boolean;
  code: number;
  message: string;
}
