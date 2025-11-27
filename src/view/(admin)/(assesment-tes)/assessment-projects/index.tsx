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
import AddAssessmentProjectModal from "./modal/add-assessment-project";
import ListAssessmentProject, { AssessmentProject } from "./table/list";
import { RowAssessmentProjects } from "./table/list-column";

export default function AssessmentProjectsView() {
  const t = useTranslations("page.assessmentProjects");
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<AssessmentProject | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const toggleAddModal = () => setOpenModal(!openModal);

  const filteredProjects = RowAssessmentProjects.filter(
    project =>
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.projectDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer title={t("title")}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
              <Typography color="text.secondary">{t("subtitle")}</Typography>
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

        <ListAssessmentProject data={filteredProjects} />

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

        {openModal && (
          <AddAssessmentProjectModal
            openModal={openModal}
            handleCloseModal={toggleAddModal}
          />
        )}
      </Box>
    </PageContainer>
  );
}
