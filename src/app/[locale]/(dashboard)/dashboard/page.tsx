import PageContainer from "@/component/shared/PageContainer";
import { Box, Typography } from "@mui/material";

export default function Dashboard() {
  return (
    <PageContainer title="Dashboard">
      <Box sx={{ minHeight: "1200px" }}>
        {/* Dashboard content here */}
        <Typography variant="h1">Welcome to the Dashboard</Typography>
      </Box>
    </PageContainer>
  );
}
