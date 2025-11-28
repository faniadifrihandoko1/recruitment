"use client";
import PaginationSectionTableCustom from "@/component/shared/custom-pagination";
import DashboardCard from "@/component/shared/DashboardCard";
import { Box, SelectChangeEvent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useListColumn } from "./list-column";

export interface AssessmentProject {
  id: number;
  projectName: string;
  projectDescription: string;
}

interface ListAssessmentProjectProps {
  data: AssessmentProject[];
}

export default function ListAssessmentProject({
  data,
}: ListAssessmentProjectProps) {
  const columns = useListColumn();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const totalRecords = data.length; // Ambil jumlah total data
  const handleLimitChange = (event: SelectChangeEvent) => {
    setIsLoading(true);
    setPageSize(Number(event.target.value));
    setPage(1); // Reset ke halaman pertama

    // Simulasi delay loading (gantilah ini dengan API call jika data dari backend)
    setTimeout(() => setIsLoading(false), 500);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setIsLoading(true);
    setPage(newPage);

    // Simulasi delay loading
    setTimeout(() => setIsLoading(false), 500);
  };

  const paginatedRows = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <DashboardCard sx={{ paddingY: 1 }}>
      <Box bgcolor={"red"} width="100%">
        <DataGrid
          rows={paginatedRows}
          columns={columns}
          disableRowSelectionOnClick
          rowHeight={55}
          autoHeight
          hideFooterSelectedRowCount
          loading={isLoading}
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
                  recordsFiltered={totalRecords}
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
