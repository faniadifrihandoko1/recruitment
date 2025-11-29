"use client";
import { Box } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { AssessmentProject } from "./list";
import { ListOptions } from "./list-options";

export function useListColumn() {
  const t = useTranslations("page.assessmentProjects");

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
        field: "projectDescription",
        headerName: t("table.projectDescription"),
        flex: 2,
        minWidth: 300,
        renderCell: (params: GridRenderCellParams<AssessmentProject>) => (
          <span style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
            {params.value}
          </span>
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
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
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

export const RowAssessmentProjects: AssessmentProject[] = [
  {
    id: 1,
    projectName: "Technical Assessment 2024",
    projectDescription:
      "Comprehensive technical assessment for evaluating programming skills, problem-solving abilities, and technical knowledge of candidates.",
  },
  {
    id: 2,
    projectName: "Behavioral Assessment Q1",
    projectDescription:
      "Assessment focused on evaluating behavioral patterns, communication skills, and team collaboration abilities.",
  },
  {
    id: 3,
    projectName: "Leadership Assessment",
    projectDescription:
      "Evaluation of leadership qualities, decision-making capabilities, and management potential of candidates.",
  },
  {
    id: 4,
    projectName: "Skills Assessment Program",
    projectDescription:
      "Comprehensive skills evaluation covering technical competencies, soft skills, and domain-specific knowledge.",
  },
  {
    id: 5,
    projectName: "Cultural Fit Assessment",
    projectDescription:
      "Assessment designed to evaluate how well candidates align with company values, culture, and work environment.",
  },
  {
    id: 6,
    projectName: "Aptitude Test 2024",
    projectDescription:
      "Standardized aptitude test measuring cognitive abilities, logical reasoning, and analytical thinking skills.",
  },
];
