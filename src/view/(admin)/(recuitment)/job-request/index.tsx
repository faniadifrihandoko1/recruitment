"use client";
import DashboardCard from "@/component/shared/DashboardCard";
import PageContainer from "@/component/shared/PageContainer";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AddJobRequestModal from "./modal/add-job-request";
import ListJobRequest, { JobRequest } from "./table/list";
import { RowjobRequests } from "./table/list-column";

export default function JobRequestView() {
  const t = useTranslations("page.jobRequest");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<JobRequest | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const toggleAddModal = () => setOpenModal(!openModal);

  const filteredRequests = RowjobRequests.filter(
    request =>
      request.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requestedBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Box sx={{ maxWidth: "560px" }}>
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
                sx={{ color: "white", fontWeight: 600 }}
                onClick={toggleAddModal}
              >
                {t("create")}
              </Button>
            </Stack>
          </Box>
        </DashboardCard>

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
              variant="contained"
              startIcon={<FilterListIcon />}
              sx={{ whiteSpace: "nowrap", color: "white" }}
            >
              {t("filter")}
            </Button>
          </Stack>
        </DashboardCard>

        {/* Table Section */}
        <ListJobRequest data={filteredRequests} />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              console.log("View detail:", selectedRow);
              handleMenuClose();
            }}
          >
            <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
            Lihat Detail
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log("Edit:", selectedRow);
              handleMenuClose();
            }}
          >
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
          </MenuItem>
          <MenuItem
            onClick={() => {
              console.log("Delete:", selectedRow);
              handleMenuClose();
            }}
            sx={{ color: "error.main" }}
          >
            <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
            Hapus
          </MenuItem>
        </Menu>

        {/* Create Job Request Modal */}
        {openModal && (
          <AddJobRequestModal
            openModal={openModal}
            handleCloseModal={toggleAddModal}
          />
        )}
      </Box>
    </PageContainer>
  );
}
