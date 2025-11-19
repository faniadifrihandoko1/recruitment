"use client";
import DashboardCard from "@/component/shared/DashboardCard";
import { DataGrid } from "@mui/x-data-grid";
import { useListColumn } from "./list-column";

export interface JobRequest {
  id: number;
  jobTitle: string;
  department: string;
  requestedBy: string;
  requestDate: string;
  deadline: string;
  applicants: number;
  status: "draft" | "pending" | "approved" | "rejected" | "open" | "closed";
}

interface ListJobRequestProps {
  data: JobRequest[];
}

export default function ListJobRequest({ data }: ListJobRequestProps) {
  const columns = useListColumn();

  return (
    <DashboardCard sx={{ paddingY: 1 }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick
        rowHeight={55}
        autoHeight
        hideFooterSelectedRowCount
        hideFooter
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50]}
      />
    </DashboardCard>
  );
}
