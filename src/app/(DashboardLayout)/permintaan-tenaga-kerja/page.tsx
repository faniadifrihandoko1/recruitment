"use client";
import DashboardCard from "@/component/shared/DashboardCard";
import PageContainer from "@/component/shared/PageContainer";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

// Sample data untuk permintaan tenaga kerja
const initialRows = [
  {
    id: 1,
    noPermintaan: "PTK23000035",
    divisi: "Unit bisnis 1",
    departemen: "IT",
    jenisPengajuan: "Penambahan",
    permintaanRealisasi: "1-0",
    status: "Y",
  },
  {
    id: 2,
    noPermintaan: "PTK23000036",
    divisi: "IT",
    departemen: "Unit",
    jenisPengajuan: "Penambahan",
    permintaanRealisasi: "12-0",
    status: "Y",
  },
  {
    id: 3,
    noPermintaan: "PTK00024000039",
    divisi: "Marketing",
    departemen: "Marketing Update",
    jenisPengajuan: "Penambahan",
    permintaanRealisasi: "2-0",
    status: "Y",
  },
  {
    id: 4,
    noPermintaan: "PTK24000040",
    divisi: "HRD",
    departemen: "HRD",
    jenisPengajuan: "Penambahan",
    permintaanRealisasi: "13-0",
    status: "Y",
  },
  {
    id: 5,
    noPermintaan: "PTK24000041",
    divisi: "Unit bisnis 1",
    departemen: "IT",
    jenisPengajuan: "Penambahan",
    permintaanRealisasi: "15-0",
    status: "Y",
  },
  {
    id: 6,
    noPermintaan: "PTK24000042",
    divisi: "Marketing",
    departemen: "Marketing",
    jenisPengajuan: "Penambahan",
    permintaanRealisasi: "123-0",
    status: "V",
  },
];

const PermintaanTenagaKerja = () => {
  const [rows] = useState(initialRows);

  const columns: GridColDef[] = [
    {
      field: "noPermintaan",
      headerName: "No Permintaan",
      width: 180,
      flex: 1,
      minWidth: 150,
      filterable: true,
    },
    {
      field: "divisi",
      headerName: "Divisi",
      width: 150,
      flex: 1,
      minWidth: 120,
      filterable: true,
    },
    {
      field: "departemen",
      headerName: "Departemen",
      width: 150,
      flex: 1,
      minWidth: 120,
      filterable: true,
    },
    {
      field: "jenisPengajuan",
      headerName: "Jenis Pengajuan",
      width: 150,
      flex: 1,
      minWidth: 130,
      filterable: true,
    },
    {
      field: "permintaanRealisasi",
      headerName: "Permintaan/Realisasi",
      width: 180,
      headerAlign: "center",
      align: "center",
      filterable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      headerAlign: "center",
      align: "center",
      filterable: true,
    },
    {
      field: "aksi",
      headerName: "",
      width: 80,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      renderCell: () => {
        return (
          <Tooltip title="Edit">
            <IconButton
              size="small"
              sx={{
                color: "#539BFF",
                "&:hover": {
                  backgroundColor: "#EBF3FE",
                },
              }}
            >
              <IconEdit size={18} />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <PageContainer title="Permintaan Tenaga Kerja">
      {/* Card dengan Table */}
      <DashboardCard>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mb: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconPlus size={20} />}
            onClick={() => {}}
            sx={{
              textTransform: "capitalize",
              fontWeight: 500,
              px: 3,
              py: 1,
            }}
          >
            Tambah
          </Button>
        </Box>

        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10, 25, 50]}
            disableRowSelectionOnClick
            disableColumnFilter={false}
            disableColumnMenu={false}
            sx={{
              border: "none",
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #e5eaef",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#F2F6FA",
                borderBottom: "2px solid #e5eaef",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#2A3547",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f6f9fc",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #e5eaef",
              },
              "& .MuiDataGrid-filterForm": {
                display: "flex",
                width: "100%",
                alignItems: "center",
              },
            }}
          />
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default PermintaanTenagaKerja;
