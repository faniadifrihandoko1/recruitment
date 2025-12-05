"use client";

import DashboardCard from "@/component/shared/DashboardCard";
import PageContainer from "@/component/shared/page-container";
import { useGetProjectById } from "@/hooks/query/project/use-project";
import { Box, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import { TabJobVacancies } from "./tab/tab-job-vacancies";
import { TabOverview } from "./tab/tab-overview";
import { stats } from "./utils/data";

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
  const t = useTranslations("page.project");
  const [activeTab, setActiveTab] = useState(0);
  const { data: projectData } = useGetProjectById(Number(projectId));

  // if (!projectData || isLoadingProject) {
  //   return (
  //     <PageContainer title={t("detail.title")} hideTitle>
  //       <Box>
  //         <Typography>Project not found</Typography>
  //       </Box>
  //     </PageContainer>
  //   );
  // }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <PageContainer
      title={t("detail.title")}
      hideTitle
      breadcrumbData={{ name: projectData?.data?.name ?? "Project not found" }}
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

          <TabPanel value={activeTab} index={0}>
            <TabOverview
              stats={stats}
              project={
                projectData?.data ?? {
                  id: 0,
                  name: "Project not found",
                  description: "No description",
                }
              }
            />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <TabJobVacancies projectId={Number(projectId)} />
          </TabPanel>
        </Box>
      </Box>
    </PageContainer>
  );
};
