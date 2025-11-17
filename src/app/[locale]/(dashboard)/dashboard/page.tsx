import PageContainer from "@/component/shared/PageContainer";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations("page.dashboard");

  return (
    <PageContainer title={t("title")}>
      <Box sx={{ minHeight: "1200px" }}>
        {/* Dashboard content here */}
        <Typography variant="h1">{t("description")}</Typography>
      </Box>
    </PageContainer>
  );
}


