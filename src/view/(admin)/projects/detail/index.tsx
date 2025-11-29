"use client";

import DashboardCard from "@/component/shared/DashboardCard";
import PageContainer from "@/component/shared/page-container";
import {
  Box,
  Chip,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AssessmentProject } from "../table/list";
import { RowAssessmentProjects } from "../table/list-column";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export const DetailProjectView = () => {
  const params = useParams();
  const projectId = params?.id as string;
  const t = useTranslations("page.assessmentProjects");
  const [activeTab, setActiveTab] = useState(0);

  // Find project data (in real app, this would be from API)
  const project: AssessmentProject | undefined = RowAssessmentProjects.find(
    p => p.id === Number(projectId)
  );

  if (!project) {
    return (
      <PageContainer title={t("detail.title")} hideTitle>
        <Box>
          <Typography>Project not found</Typography>
        </Box>
      </PageContainer>
    );
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Mock data for stats
  const stats = {
    totalParticipants: 125,
    activeParticipants: 98,
    completedTests: 87,
    pendingTests: 11,
  };

  return (
    <PageContainer
      title={t("detail.title")}
      hideTitle
      breadcrumbData={{ name: project.projectName }}
      showBackButton
      backHref="/projects"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Tab Navigation Head */}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <DashboardCard sx={{ p: 0, pb: 0 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                px: 3,
                borderBottom: "1px solid #e5eaef",
                "& .MuiTabs-indicator": {
                  backgroundColor: "#13DEB9",
                  height: 3,
                },
              }}
            >
              <Tab
                label={t("detail.tabs.overview")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  color: activeTab === 0 ? "#13DEB9" : "text.secondary",
                  minHeight: 64,
                  "&.Mui-selected": {
                    color: "#13DEB9",
                  },
                }}
              />
              <Tab
                label={t("detail.tabs.jobVacancies")}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  color: activeTab === 1 ? "#13DEB9" : "text.secondary",
                  minHeight: 64,
                  "&.Mui-selected": {
                    color: "#13DEB9",
                  },
                }}
              />
            </Tabs>
          </DashboardCard>

          {/* Tab Content */}
          <TabPanel value={activeTab} index={0}>
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
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
                    background:
                      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
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
                    background:
                      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
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
                          {project.projectDescription}
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
          </TabPanel>

          {/* Job Vacancies Tab Content */}
          <TabPanel value={activeTab} index={1}>
            <DashboardCard>
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: "#2A3547", mb: 2 }}
              >
                {t("detail.jobVacancies.title")}
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
                  {t("detail.jobVacancies.noVacancies")}
                </Typography>
              </Box>
            </DashboardCard>
          </TabPanel>
        </Box>
      </Box>
    </PageContainer>
  );
};
