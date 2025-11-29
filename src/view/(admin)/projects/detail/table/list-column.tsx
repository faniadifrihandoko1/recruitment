"use client";
import { Box, Chip, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { JobVacancy } from "./list";
import { JobVacancyOptions } from "./list-options";

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
        field: "openDate",
        headerName: t("table.openDate"),
        flex: 1,
        minWidth: 150,
        display: "flex",
        renderCell: (params: GridRenderCellParams<JobVacancy>) => (
          <Typography fontSize={13}>
            {dayjs(params.value).format("DD MMM YYYY")}
          </Typography>
        ),
      },
      {
        field: "closeDate",
        headerName: t("table.closeDate"),
        flex: 1,
        minWidth: 150,
        display: "flex",
        renderCell: (params: GridRenderCellParams<JobVacancy>) => (
          <Typography fontSize={13}>
            {dayjs(params.value).format("DD MMM YYYY")}
          </Typography>
        ),
      },
      {
        field: "status",
        headerName: t("table.status"),
        width: 150,
        renderCell: (params: GridRenderCellParams<JobVacancy>) => {
          const status = params.value as string;
          const getStatusLabel = (status: string) => {
            switch (status.toLowerCase()) {
              case "cv_screening":
              case "cvscreening":
                return t("status.cvScreening");
              case "online_test":
              case "onlinetest":
                return t("status.onlineTest");
              case "interview":
                return t("status.interview");
              case "psikotest":
                return t("status.psikotest");
              case "others":
                return t("status.others");
              default:
                return status;
            }
          };

          const getStatusColor = (status: string) => {
            switch (status.toLowerCase()) {
              case "cv_screening":
              case "cvscreening":
                return { bg: "#e3f2fd", color: "#1976d2" };
              case "online_test":
              case "onlinetest":
                return { bg: "#f3e5f5", color: "#7b1fa2" };
              case "interview":
                return { bg: "#fff3e0", color: "#f57c00" };
              case "psikotest":
                return { bg: "#e8f5e9", color: "#388e3c" };
              case "others":
                return { bg: "#f5f5f5", color: "#616161" };
              default:
                return { bg: "#f5f5f5", color: "#757575" };
            }
          };

          const colors = getStatusColor(status);
          const label = getStatusLabel(status);

          return (
            <Chip
              label={label}
              size="small"
              sx={{
                backgroundColor: colors.bg,
                color: colors.color,
                fontWeight: 500,
                fontSize: "0.8125rem",
                height: "24px",
              }}
            />
          );
        },
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
    status: "cv_screening",
    applicants: 24,
    openDate: "2025-01-01",
    closeDate: "2025-02-01",
  },
  {
    id: 2,
    jobTitle: "Backend Engineer",
    department: "Engineering",
    status: "online_test",
    applicants: 18,
    openDate: "2025-01-15",
    closeDate: "2025-02-15",
  },
  {
    id: 3,
    jobTitle: "UI/UX Designer",
    department: "Design",
    status: "interview",
    applicants: 32,
    openDate: "2025-01-10",
    closeDate: "2025-02-10",
  },
  {
    id: 4,
    jobTitle: "Product Manager",
    department: "Product",
    status: "psikotest",
    applicants: 12,
    openDate: "2025-01-20",
    closeDate: "2025-02-20",
  },
  {
    id: 5,
    jobTitle: "DevOps Engineer",
    department: "Engineering",
    status: "others",
    applicants: 15,
    openDate: "2025-01-05",
    closeDate: "2025-02-05",
  },
];
