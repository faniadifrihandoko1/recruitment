"use client";
import PaginationSectionTableCustom from "@/component/shared/custom-pagination";
import DashboardCard from "@/component/shared/DashboardCard";
import { Box, SelectChangeEvent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { MockModules, useModulesColumn } from "./list-column";

export interface Module {
  id: number;
  moduleName: string;
  planStartDate: string;
  planEndDate: string;
  description: string;
}

export default function ModulesList() {
  const columns = useModulesColumn();
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const totalRecords = MockModules.length;
  const handleLimitChange = (event: SelectChangeEvent) => {
    setIsLoading(true);
    setPageSize(Number(event.target.value));
    setPage(1);

    setTimeout(() => setIsLoading(false), 500);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setIsLoading(true);
    setPage(newPage);

    setTimeout(() => setIsLoading(false), 500);
  };

  const paginatedRows = MockModules.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <DashboardCard sx={{ paddingY: 1 }}>
      <Box width="100%">
        <DataGrid
          rows={paginatedRows}
          columns={columns}
          rowHeight={55}
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
