"use client";
import { Box, Chip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { JobVacancy } from "./job-vacancies-list";
import { JobVacancyOptions } from "./job-vacancies-options";

export function useJobVacanciesColumn() {
  const t = useTranslations("page.assessmentProjects.detail.jobVacancies");

  return useMemo(() => {
    const columns: GridColDef[] = [
      {
        field: "id",
        headerName: t("table.no"),
        width: 70,
        renderCell: (params: GridRenderCellParams) => {
          return params.rowNode?.id as number;
        },
      },
      {
        field: "jobTitle",
        headerName: t("table.jobTitle"),
        flex: 1,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams<JobVacancy>) => (
          <strong>{params.value}</strong>
        ),
      },
      {
        field: "department",
        headerName: t("table.department"),
        flex: 1,
        minWidth: 150,
      },
      {
        field: "status",
        headerName: t("table.status"),
        width: 120,
        renderCell: (params: GridRenderCellParams<JobVacancy>) => {
          const status = params.value as string;
          const getStatusColor = (status: string) => {
            switch (status.toLowerCase()) {
              case "open":
                return { bg: "#e8f5e9", color: "#2e7d32" };
              case "closed":
                return { bg: "#ffebee", color: "#c62828" };
              case "draft":
                return { bg: "#fff3e0", color: "#ef6c00" };
              default:
                return { bg: "#f5f5f5", color: "#757575" };
            }
          };
          const colors = getStatusColor(status);
          
          return (
            <Chip
              label={status}
              size="small"
              sx={{
                backgroundColor: colors.bg,
                color: colors.color,
                fontWeight: 600,
                fontSize: "0.75rem",
              }}
            />
          );
        },
      },
      {
        field: "applicants",
        headerName: t("table.applicants"),
        width: 120,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "actions",
        headerName: t("table.actions"),
        width: 100,
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams<JobVacancy>) => (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={event => event.stopPropagation()}
          >
            <JobVacancyOptions row={params.row} />
          </Box>
        ),
      },
    ];

    return columns;
  }, [t]);
}

// Mock data
export const MockJobVacancies: JobVacancy[] = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    department: "Engineering",
    status: "Open",
    applicants: 24,
  },
  {
    id: 2,
    jobTitle: "Backend Engineer",
    department: "Engineering",
    status: "Open",
    applicants: 18,
  },
  {
    id: 3,
    jobTitle: "UI/UX Designer",
    department: "Design",
    status: "Closed",
    applicants: 32,
  },
  {
    id: 4,
    jobTitle: "Product Manager",
    department: "Product",
    status: "Draft",
    applicants: 0,
  },
  {
    id: 5,
    jobTitle: "DevOps Engineer",
    department: "Engineering",
    status: "Open",
    applicants: 15,
  },
];
