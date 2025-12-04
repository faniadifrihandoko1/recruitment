"use client";
import { ProjectInterface } from "@/types/project";
import { Box, Chip, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { ListOptions } from "./list-options";

export function useListColumn() {
  const t = useTranslations("page.assessmentProjects");

  return useMemo(() => {
    const columns: GridColDef[] = [
      {
        field: "id",
        headerName: t("table.no"),
        width: 100,
        align: "center",
        headerAlign: "center",
        disableColumnMenu: true,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
          // Calculate number based on row index and pagination

          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Chip
                label={params.row.id}
                size="small"
                sx={{
                  backgroundColor: "#F2F6FA",
                  color: "#5A6A85",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  height: "24px",
                  minWidth: "32px",
                  "& .MuiChip-label": {
                    padding: "0 8px",
                  },
                }}
              />
            </Box>
          );
        },
      },
      {
        field: "name",
        headerName: t("table.projectName"),
        flex: 1,
        minWidth: 220,
        renderCell: (params: GridRenderCellParams<ProjectInterface>) => (
          <strong>{params.value}</strong>
        ),
      },
      {
        field: "description",
        headerName: t("table.projectDescription"),
        flex: 2,
        minWidth: 320,
        display: "flex",
        renderCell: (params: GridRenderCellParams<ProjectInterface>) => (
          <Typography fontSize={13}>{params.value}</Typography>
        ),
      },
      {
        field: "actions",
        headerName: t("table.actions"),
        width: 100,
        align: "center",
        headerAlign: "center",
        disableColumnMenu: true,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderCellParams<ProjectInterface>) => (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={event => event.stopPropagation()}
          >
            <ListOptions row={params.row} />
          </Box>
        ),
      },
    ];

    return columns;
  }, [t]);
}

export const RowProjects: ProjectInterface[] = [
  {
    id: 1,
    name: "Technical Assessment 2024",
    description:
      "Comprehensive technical assessment for evaluating programming skills, problem-solving abilities, and technical knowledge of candidates.",
  },
  {
    id: 2,
    name: "Behavioral Assessment Q1",
    description:
      "Assessment focused on evaluating behavioral patterns, communication skills, and team collaboration abilities.",
  },
  {
    id: 3,
    name: "Leadership Assessment",
    description:
      "Evaluation of leadership qualities, decision-making capabilities, and management potential of candidates.",
  },
  {
    id: 4,
    name: "Skills Assessment Program",
    description:
      "Comprehensive skills evaluation covering technical competencies, soft skills, and domain-specific knowledge.",
  },
  {
    id: 5,
    name: "Cultural Fit Assessment",
    description:
      "Assessment designed to evaluate how well candidates align with company values, culture, and work environment.",
  },
  {
    id: 6,
    name: "Aptitude Test 2024",
    description:
      "Standardized aptitude test measuring cognitive abilities, logical reasoning, and analytical thinking skills.",
  },
];
