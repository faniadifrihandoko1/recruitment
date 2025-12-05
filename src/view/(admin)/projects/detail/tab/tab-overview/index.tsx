"use client";
import DashboardCard from "@/component/shared/DashboardCard";
import { ProjectInterface } from "@/types/project";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

interface TabOverviewProps {
  stats: {
    totalParticipants: number;
    activeParticipants: number;
    completedTests: number;
    pendingTests: number;
  };
  project?: ProjectInterface | null;
}

export const TabOverview = ({ stats, project }: TabOverviewProps) => {
  const t = useTranslations("page.project");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Statistics Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        <DashboardCard
          sx={{
            p: 2.5,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, mb: 1, fontSize: "0.875rem" }}
          >
            {t("detail.stats.totalParticipants")}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, fontSize: "1.75rem" }}
          >
            {stats.totalParticipants}
          </Typography>
        </DashboardCard>
        <DashboardCard
          sx={{
            p: 2.5,
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "white",
          }}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, mb: 1, fontSize: "0.875rem" }}
          >
            {t("detail.stats.activeParticipants")}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, fontSize: "1.75rem" }}
          >
            {stats.activeParticipants}
          </Typography>
        </DashboardCard>
        <DashboardCard
          sx={{
            p: 2.5,
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            color: "white",
          }}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, mb: 1, fontSize: "0.875rem" }}
          >
            {t("detail.stats.completedTests")}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, fontSize: "1.75rem" }}
          >
            {stats.completedTests}
          </Typography>
        </DashboardCard>
        <DashboardCard
          sx={{
            p: 2.5,
            background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            color: "white",
          }}
        >
          <Typography
            variant="body2"
            sx={{ opacity: 0.9, mb: 1, fontSize: "0.875rem" }}
          >
            {t("detail.stats.pendingTests")}
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, fontSize: "1.75rem" }}
          >
            {stats.pendingTests}
          </Typography>
        </DashboardCard>
      </Box>

      {/* Two Column Layout */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3,
        }}
      >
        {/* Left Column */}
        <Box>
          <DashboardCard>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#2A3547", mb: 2 }}
            >
              {t("detail.overview.projectInfo")}
            </Typography>
            <Divider sx={{ mb: 2.5 }} />
            <Stack spacing={2.5}>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5, fontWeight: 500 }}
                >
                  {t("detail.overview.description")}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {project?.description ?? "No description"}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5, fontWeight: 500 }}
                >
                  {t("detail.overview.status")}
                </Typography>
                <Chip
                  label={t("status.active")}
                  sx={{
                    backgroundColor: "#e8f5e9",
                    color: "#2e7d32",
                    fontWeight: 600,
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5, fontWeight: 500 }}
                >
                  {t("detail.overview.createdDate")}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {new Date().toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5, fontWeight: 500 }}
                >
                  {t("detail.overview.lastUpdated")}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {new Date().toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
              </Box>
            </Stack>
          </DashboardCard>

          <DashboardCard sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#2A3547", mb: 2 }}
            >
              {t("detail.overview.participants")}
            </Typography>
            <Divider sx={{ mb: 2.5 }} />
            <Box
              sx={{
                minHeight: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "text.secondary",
              }}
            >
              <Typography variant="body2">
                Participant list will be displayed here
              </Typography>
            </Box>
          </DashboardCard>
        </Box>

        {/* Right Column */}
        <Box>
          <DashboardCard>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "#2A3547", mb: 2 }}
            >
              {t("detail.overview.recentActivity")}
            </Typography>
            <Divider sx={{ mb: 2.5 }} />
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
                Recent activity will be displayed here
              </Typography>
            </Box>
          </DashboardCard>
        </Box>
      </Box>
    </Box>
  );
};
