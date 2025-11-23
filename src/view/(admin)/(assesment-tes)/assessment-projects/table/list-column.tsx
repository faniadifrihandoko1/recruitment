"use client";
import { Chip, ChipProps } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { AssessmentProject } from "./list";
import { ListOptions } from "./list-options";

export function useListColumn() {
  const t = useTranslations("page.assessmentProjects");

  const getStatusColor = (
    status: AssessmentProject["status"]
  ): ChipProps["color"] => {
    switch (status) {
      case "active":
        return "success";
      case "completed":
        return "info";
      case "archived":
        return "default";
      case "draft":
      default:
        return "warning";
    }
  };

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
        field: "projectName",
        headerName: t("table.projectName"),
        flex: 1,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams<AssessmentProject>) => (
          <strong>{params.value}</strong>
        ),
      },
      {
        field: "projectType",
        headerName: t("table.projectType"),
        flex: 1,
        minWidth: 150,
      },
      {
        field: "createdBy",
        headerName: t("table.createdBy"),
        flex: 1,
        minWidth: 150,
      },
      {
        field: "createdDate",
        headerName: t("table.createdDate"),
        flex: 1,
        minWidth: 150,
        renderCell: (params: GridRenderCellParams<AssessmentProject>) =>
          dayjs(params.value).format("DD/MM/YYYY"),
      },
      {
        field: "participants",
        headerName: t("table.participants"),
        width: 120,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams<AssessmentProject>) => (
          <strong>{params.value}</strong>
        ),
      },
      {
        field: "status",
        headerName: t("table.status"),
        width: 130,
        align: "center",
        headerAlign: "center",
        renderCell: (params: GridRenderCellParams<AssessmentProject>) => (
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
        renderCell: (params: GridRenderCellParams<AssessmentProject>) => (
          <ListOptions row={params.row} />
        ),
      },
    ];

    return columns;
  }, [t]);
}

export const RowAssessmentProjects: AssessmentProject[] = [
  {
    id: 1,
    projectName: "Technical Assessment 2024",
    projectType: "Technical Test",
    createdBy: "John Doe",
    createdDate: "2024-01-15",
    participants: 45,
    status: "active",
  },
  {
    id: 2,
    projectName: "Behavioral Assessment Q1",
    projectType: "Behavioral Test",
    createdBy: "Jane Smith",
    createdDate: "2024-01-20",
    participants: 32,
    status: "completed",
  },
  {
    id: 3,
    projectName: "Leadership Assessment",
    projectType: "Leadership Test",
    createdBy: "Mike Johnson",
    createdDate: "2024-01-18",
    participants: 18,
    status: "active",
  },
  {
    id: 4,
    projectName: "Skills Assessment Program",
    projectType: "Skills Test",
    createdBy: "Sarah Williams",
    createdDate: "2024-01-22",
    participants: 28,
    status: "draft",
  },
  {
    id: 5,
    projectName: "Cultural Fit Assessment",
    projectType: "Cultural Test",
    createdBy: "David Brown",
    createdDate: "2024-01-10",
    participants: 15,
    status: "archived",
  },
  {
    id: 6,
    projectName: "Aptitude Test 2024",
    projectType: "Aptitude Test",
    createdBy: "Emily Davis",
    createdDate: "2024-01-25",
    participants: 52,
    status: "active",
  },
];
