"use client";
import DashboardCard from "@/component/shared/DashboardCard";
import { DataGrid } from "@mui/x-data-grid";
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
