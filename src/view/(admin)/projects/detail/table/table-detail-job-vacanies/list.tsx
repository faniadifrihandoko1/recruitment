"use client";
import PaginationSectionTableCustom from "@/component/shared/custom-pagination";
import DashboardCard from "@/component/shared/DashboardCard";
import { useGetVacancies } from "@/hooks/query/vacancies/use-vacancies";
import { Box, SelectChangeEvent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useJobVacanciesColumn } from "./list-column";

export interface JobVacancy {
  id: number;
  jobTitle: string;
  department: string;
  status: string;
  applicants: number;
  openDate: string;
  closeDate: string;
}

interface JobVacanciesListProps {
  projectId: number;
}

export default function JobVacanciesList({ projectId }: JobVacanciesListProps) {
  const columns = useJobVacanciesColumn();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const { data: dataVacancies, isLoading: isLoadingVacancies } =
    useGetVacancies({
      page,
      limit: pageSize,
      project_id: projectId,
    });

  const handleLimitChange = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <DashboardCard sx={{ paddingY: 1 }}>
      <Box width="100%">
        <DataGrid
          rows={dataVacancies?.data || []}
          columns={columns}
          rowHeight={55}
          hideFooterSelectedRowCount
          loading={isLoadingVacancies}
          hideFooter={dataVacancies?.data?.length === 0}
          slots={{
            pagination: () => (
              <Box
                width="100%"
                paddingX={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop="0.75rem"
              >
                <PaginationSectionTableCustom
                  page={page}
                  pageSize={pageSize}
                  recordsFiltered={dataVacancies?.meta?.total || 0}
                  handleLimitChange={handleLimitChange}
                  handlePageChange={handlePageChange}
                />
              </Box>
            ),
          }}
        />
      </Box>
    </DashboardCard>
  );
}
