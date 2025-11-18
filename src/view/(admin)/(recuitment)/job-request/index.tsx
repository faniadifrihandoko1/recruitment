"use client";
import PageContainer from "@/component/shared/PageContainer";
import { Stack, Typography } from "@mui/material";

export default function JobRequestView() {
  return (
    <PageContainer title="Job Request">
      <Stack spacing={3}>
        <Typography variant="h1">Job Request</Typography>
      </Stack>
    </PageContainer>
  );
}
