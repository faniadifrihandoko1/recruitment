"use client";
import { VacanciesInterface, VacancyStatus } from "@/types/vacancies";
import { Box, Chip, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { JobVacancy } from "./list";
import { JobVacancyOptions } from "./list-options";

export function useJobVacanciesColumn() {
  const t = useTranslations("page.project.detail.jobVacancies");

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
        field: "name",
        headerName: t("table.jobTitle"),
        flex: 1,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams<VacanciesInterface>) => (
          <strong>{params.value}</strong>
        ),
      },
      {
        field: "start",
        headerName: t("table.openDate"),
        flex: 1,
        minWidth: 150,
        display: "flex",
        renderCell: (params: GridRenderCellParams<VacanciesInterface>) => (
          <Typography fontSize={13}>
            {dayjs(params.value).format("DD MMM YYYY")}
          </Typography>
        ),
      },
      {
        field: "end",
        headerName: t("table.closeDate"),
        flex: 1,
        minWidth: 150,
        display: "flex",
        renderCell: (params: GridRenderCellParams<VacanciesInterface>) => (
          <Typography fontSize={13}>
            {dayjs(params.value).format("DD MMM YYYY")}
          </Typography>
        ),
      },
      {
        field: "status",
        headerName: t("table.status"),
        width: 150,
        renderCell: (params: GridRenderCellParams<VacanciesInterface>) => {
          const status = (params.value as VacancyStatus) || "draft";
          const normalizedStatus = status.toLowerCase() as VacancyStatus;

          const statusMeta: Record<
            VacancyStatus,
            { label: string; bg: string; color: string }
          > = {
            draft: {
              label: t("status.draft"),
              bg: "#fff3e0",
              color: "#ef6c00",
            },
            open: {
              label: t("status.open"),
              bg: "#e8f5e9",
              color: "#2e7d32",
            },
            closed: {
              label: t("status.closed"),
              bg: "#fce4ec",
              color: "#c2185b",
            },
            cancelled: {
              label: t("status.cancelled"),
              bg: "#eceff1",
              color: "#546e7a",
            },
          };

          const { label, bg, color } =
            statusMeta[normalizedStatus] ?? statusMeta.draft;

          return (
            <Chip
              label={label}
              size="small"
              sx={{
                backgroundColor: bg,
                color,
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
        renderCell: (params: GridRenderCellParams<VacanciesInterface>) => (
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
