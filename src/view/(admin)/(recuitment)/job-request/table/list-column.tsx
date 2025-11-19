"use client";
import { Chip, ChipProps } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { JobRequest } from "./list";
import { ListOptions } from "./list-options";

export function useListColumn() {
  const t = useTranslations("page.jobRequest");

  const getStatusColor = (status: JobRequest["status"]): ChipProps["color"] => {
    switch (status) {
      case "approved":
      case "open":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
      case "closed":
        return "error";
      case "draft":
      default:
        return "default";
    }
  };

  return useMemo(() => {
    const columns: GridColDef[] = [
      {
        field: "id",
        headerName: t("table.no"),
        width: 70,
        renderCell: (params: GridRenderCellParams) => {
          console.log(params.rowNode);

          return params.rowNode?.id as number;
        },
      },
      {
        field: "jobTitle",
        headerName: t("table.jobTitle"),
        flex: 1,
        minWidth: 180,
        renderCell: (params: GridRenderCellParams<JobRequest>) => (
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
        field: "requestedBy",
        headerName: t("table.requestedBy"),
        flex: 1,
        minWidth: 150,
      },
      {
        field: "requestDate",
        headerName: t("table.requestDate"),
        flex: 1,
        minWidth: 150,
        renderCell: (params: GridRenderCellParams<JobRequest>) =>
          dayjs(params.value).format("DD/MM/YYYY"),
      },
      {
        field: "deadline",
        headerName: t("table.deadline"),
        flex: 1,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams<JobRequest>) =>
          dayjs(params.value).format("DD/MM/YYYY"),
      },
      {
        field: "applicants",
        headerName: t("table.applicants"),
        width: 120,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams<JobRequest>) => (
          <strong>{params.value}</strong>
        ),
      },
      {
        field: "status",
        headerName: t("table.status"),
        width: 130,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams<JobRequest>) => (
          <Chip
            label={t(`status.${params.value}`)}
            color={getStatusColor(params.value)}
            size="small"
            variant={params.value === "draft" ? "outlined" : "filled"}
          />
        ),
      },
      {
        field: "actions",
        headerName: t("table.actions"),
        width: 100,
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams<JobRequest>) => (
          <ListOptions row={params.row} />
        ),
      },
    ];

    return columns;
  }, [t]);
}

export const RowjobRequests: JobRequest[] = [
  {
    id: 1,
    jobTitle: "Frontend Engineer",
    department: "Engineering",
    requestedBy: "John Doe",
    requestDate: "2024-01-15",
    deadline: "2024-02-15",
    applicants: 24,
    status: "open",
  },
  {
    id: 2,
    jobTitle: "Product Manager",
    department: "Product",
    requestedBy: "Jane Smith",
    requestDate: "2024-01-20",
    deadline: "2024-02-20",
    applicants: 18,
    status: "approved",
  },
  {
    id: 3,
    jobTitle: "UX Designer",
    department: "Design",
    requestedBy: "Mike Johnson",
    requestDate: "2024-01-18",
    deadline: "2024-02-18",
    applicants: 32,
    status: "pending",
  },
  {
    id: 4,
    jobTitle: "Backend Engineer",
    department: "Engineering",
    requestedBy: "Sarah Williams",
    requestDate: "2024-01-22",
    deadline: "2024-02-22",
    applicants: 15,
    status: "draft",
  },
  {
    id: 5,
    jobTitle: "HR Generalist",
    department: "Human Resources",
    requestedBy: "David Brown",
    requestDate: "2024-01-10",
    deadline: "2024-02-10",
    applicants: 28,
    status: "closed",
  },
  {
    id: 6,
    jobTitle: "QA Specialist",
    department: "Quality Assurance",
    requestedBy: "Emily Davis",
    requestDate: "2024-01-25",
    deadline: "2024-02-25",
    applicants: 12,
    status: "rejected",
  },
];
