"use client";
import DashboardCard from "@/component/shared/DashboardCard";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AddJobVacanciesModal } from "../../modal/add-job-vacancies";
import JobVacanciesList from "../../table/table-detail-job-vacanies/list";
import { MockJobVacancies } from "../../table/table-detail-job-vacanies/list-column";

export const TabJobVacancies = () => {
  const t = useTranslations("page.project");
  const [openAdd, setOpenAdd] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleAddModal = () => setOpenAdd(!openAdd);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Search and Filter */}
      <DashboardCard>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems={{ xs: "stretch", sm: "center" }}
          justifyContent={{ xs: "stretch", sm: "flex-end" }}
        >
          <TextField
            fullWidth
            placeholder={t("detail.jobVacancies.search")}
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
            color="inherit"
            startIcon={<FilterListIcon />}
            sx={{ whiteSpace: "nowrap" }}
          >
            {t("detail.jobVacancies.filter")}
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowOutwardIcon fontSize="small" />}
            sx={{
              whiteSpace: "nowrap",
              color: "white",
              fontWeight: 600,
            }}
            onClick={toggleAddModal}
          >
            {t("detail.jobVacancies.add")}
          </Button>
        </Stack>
      </DashboardCard>

      {/* Table */}
      {MockJobVacancies.length > 0 ? (
        <JobVacanciesList
          data={MockJobVacancies.filter(
            vacancy =>
              vacancy.jobTitle
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              vacancy.department
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
          )}
        />
      ) : (
        <DashboardCard>
          <Box
            sx={{
              minHeight: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
            }}
          >
            <Typography variant="body2">
              {t("detail.jobVacancies.noVacancies")}
            </Typography>
          </Box>
        </DashboardCard>
      )}
      {openAdd && (
        <AddJobVacanciesModal openModal={openAdd} toggle={toggleAddModal} />
      )}
    </Box>
  );
};
