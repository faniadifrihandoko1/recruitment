"use client";
import DashboardCard from "@/component/shared/DashboardCard";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Box, Button, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AddJobVacanciesModal } from "../../modal/add-job-vacancies";
import JobVacanciesList from "../../table/table-detail-job-vacanies/list";

export const TabJobVacancies = ({ projectId }: { projectId: number }) => {
  const t = useTranslations("page.project");
  const [openAdd, setOpenAdd] = useState(false);

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
          {/* <TextField
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
          /> */}
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

      <JobVacanciesList projectId={projectId} />

      {openAdd && (
        <AddJobVacanciesModal openModal={openAdd} toggle={toggleAddModal} />
      )}
    </Box>
  );
};
