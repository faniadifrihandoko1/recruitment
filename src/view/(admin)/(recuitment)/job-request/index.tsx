"use client";
import DashboardCard from "@/component/shared/DashboardCard";
import PageContainer from "@/component/shared/PageContainer";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Chip,
  ChipProps,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface JobRequest {
  id: number;
  jobTitle: string;
  department: string;
  requestedBy: string;
  requestDate: string;
  deadline: string;
  applicants: number;
  status: "draft" | "pending" | "approved" | "rejected" | "open" | "closed";
}

const jobRequests: JobRequest[] = [
  {
    id: 1,
    jobTitle: "Frontend Engineer",
    department: "Engineering",
    requestedBy: "John Doe",
    requestDate: "2024-01-15",
    deadline: "2024-02-15",
    applicants: 24,
    status: "open",
  },
  {
    id: 2,
    jobTitle: "Product Manager",
    department: "Product",
    requestedBy: "Jane Smith",
    requestDate: "2024-01-20",
    deadline: "2024-02-20",
    applicants: 18,
    status: "approved",
  },
  {
    id: 3,
    jobTitle: "UX Designer",
    department: "Design",
    requestedBy: "Mike Johnson",
    requestDate: "2024-01-18",
    deadline: "2024-02-18",
    applicants: 32,
    status: "pending",
  },
  {
    id: 4,
    jobTitle: "Backend Engineer",
    department: "Engineering",
    requestedBy: "Sarah Williams",
    requestDate: "2024-01-22",
    deadline: "2024-02-22",
    applicants: 15,
    status: "draft",
  },
  {
    id: 5,
    jobTitle: "HR Generalist",
    department: "Human Resources",
    requestedBy: "David Brown",
    requestDate: "2024-01-10",
    deadline: "2024-02-10",
    applicants: 28,
    status: "closed",
  },
  {
    id: 6,
    jobTitle: "QA Specialist",
    department: "Quality Assurance",
    requestedBy: "Emily Davis",
    requestDate: "2024-01-25",
    deadline: "2024-02-25",
    applicants: 12,
    status: "rejected",
  },
];

const getStatusColor = (status: JobRequest["status"]): ChipProps["color"] => {
  switch (status) {
    case "approved":
    case "open":
      return "success";
    case "pending":
      return "warning";
    case "rejected":
    case "closed":
      return "error";
    case "draft":
    default:
      return "default";
  }
};

export default function JobRequestView() {
  const t = useTranslations("page.jobRequest");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const filteredRequests = jobRequests.filter(
    request =>
      request.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <PageContainer title={t("title")}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Header Section */}
        <DashboardCard>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ maxWidth: "520px" }}>
              <Typography variant="h4" fontWeight={600} color="#2A3547" mb={1}>
                {t("description")}
              </Typography>
              <Typography color="text.secondary">
                Kelola semua permintaan lowongan kerja, pantau status, dan
                kelola pelamar dalam satu tempat.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5}>
              <Button variant="outlined" color="inherit">
                {t("export")}
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowOutwardIcon fontSize="small" />}
              >
                {t("create")}
              </Button>
            </Stack>
          </Box>
        </DashboardCard>

        {/* Search and Filter Section */}
        <DashboardCard>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", sm: "center" }}
            justifyContent={{ xs: "stretch", sm: "flex-end" }}
          >
            <TextField
              fullWidth
              placeholder={t("search")}
              value={searchQuery}
              size="small"
              onChange={e => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: { sm: "400px" } }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              sx={{ whiteSpace: "nowrap" }}
            >
              {t("filter")}
            </Button>
          </Stack>
        </DashboardCard>

        {/* Table Section */}
        <DashboardCard>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight={600}>{t("table.no")}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>
                      {t("table.jobTitle")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>
                      {t("table.department")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>
                      {t("table.requestedBy")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>
                      {t("table.requestDate")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight={600}>
                      {t("table.deadline")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={600}>
                      {t("table.applicants")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={600}>
                      {t("table.status")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontWeight={600}>
                      {t("table.actions")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">
                        Tidak ada data ditemukan
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request, index) => (
                    <TableRow key={request.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Typography fontWeight={500}>
                          {request.jobTitle}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="text.secondary">
                          {request.department}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="text.secondary">
                          {request.requestedBy}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="text.secondary">
                          {formatDate(request.requestDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="text.secondary">
                          {formatDate(request.deadline)}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontWeight={500}>
                          {request.applicants}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={t(`status.${request.status}`)}
                          color={getStatusColor(request.status)}
                          size="small"
                          variant={
                            request.status === "draft" ? "outlined" : "filled"
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton size="small" onClick={handleMenuOpen}>
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DashboardCard>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
            Lihat Detail
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Hapus
          </MenuItem>
        </Menu>
      </Box>
    </PageContainer>
  );
}
