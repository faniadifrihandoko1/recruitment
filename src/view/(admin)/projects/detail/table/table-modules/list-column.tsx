"use client";
import { Box, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { Module } from "./list";
import { ModulesOptions } from "./list-options";

export function useModulesColumn() {
  const t = useTranslations("page.project.detail.table.table-modules");

  return useMemo(() => {
    const columns: GridColDef[] = [
      {
        field: "id",
        headerName: t("no"),
        width: 70,
        renderCell: (params: GridRenderCellParams) => {
          return params.rowNode?.id as number;
        },
      },
      {
        field: "moduleName",
        headerName: t("moduleName"),
        flex: 1,
        minWidth: 200,
        renderCell: (params: GridRenderCellParams<Module>) => (
          <strong>{params.value}</strong>
        ),
      },
      {
        field: "planStartDate",
        headerName: t("planStartDate"),
        flex: 1,
        minWidth: 150,
        display: "flex",
        renderCell: (params: GridRenderCellParams<Module>) => (
          <Typography fontSize={13}>
            {dayjs(params.value).format("DD MMM YYYY")}
          </Typography>
        ),
      },
      {
        field: "planEndDate",
        headerName: t("planEndDate"),
        flex: 1,
        minWidth: 150,
        display: "flex",
        renderCell: (params: GridRenderCellParams<Module>) => (
          <Typography fontSize={13}>
            {dayjs(params.value).format("DD MMM YYYY")}
          </Typography>
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
        renderCell: (params: GridRenderCellParams<Module>) => (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={event => event.stopPropagation()}
          >
            <ModulesOptions row={params.row} />
          </Box>
        ),
      },
    ];

    return columns;
  }, [t]);
}

// Mock data
export const MockModules: Module[] = [
  {
    id: 1,
    moduleName: "Screening CV AI",
    planStartDate: "2025-01-01",
    planEndDate: "2025-02-01",
    description: "Description",
  },
  {
    id: 2,
    moduleName: "Psikotes",
    planStartDate: "2025-01-01",
    planEndDate: "2025-02-01",
    description: "Description",
  },
  {
    id: 3,
    moduleName: "Interview",
    planStartDate: "2025-01-01",
    planEndDate: "2025-02-01",
    description: "Description",
  },
];
