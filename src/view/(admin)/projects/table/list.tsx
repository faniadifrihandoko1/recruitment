"use client";
import PaginationSectionTableCustom from "@/component/shared/custom-pagination";
import DashboardCard from "@/component/shared/DashboardCard";
import { useGetProjects } from "@/hooks/query/project/use-project";
import { ProjectInterface } from "@/types/project";
import { Box, SelectChangeEvent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useListColumn } from "./list-column";

export default function ListAssessmentProject() {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const router = useRouter();
  const { data: dataProjects, isLoading: isLoadingProjects } = useGetProjects({
    page,
    limit: pageSize,
  });
  
  const columns = useListColumn();

  const handleRowClick = (row: ProjectInterface) => {
    router.push(`/projects/detail/${row.id}`);
  };

  const handleLimitChange = (event: SelectChangeEvent) => {
    setPageSize(Number(event.target.value));
    setPage(1); // Reset ke halaman pertama
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <DashboardCard sx={{ paddingY: 1, paddingX: 0, overflow: "hidden" }}>
      <Box width="100%">
        <DataGrid
          rows={dataProjects?.data || []}
          columns={columns}
          rowHeight={64}
          onRowClick={params => handleRowClick(params.row as ProjectInterface)}
          hideFooterSelectedRowCount
          loading={isLoadingProjects}
          disableColumnMenu
          disableRowSelectionOnClick
          slots={{
            pagination: () => (
              <Box
                width="100%"
                paddingX={2}
                display="flex"
                justifyContent="space-between"
                sx={{ bgColor: "red" }}
                alignItems="center"
                marginTop="0.75rem"
                minHeight="64px"
              >
                <PaginationSectionTableCustom
                  page={page}
                  pageSize={pageSize}
                  recordsFiltered={dataProjects?.meta.total || 0}
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
