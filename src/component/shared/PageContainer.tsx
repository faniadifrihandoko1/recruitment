"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

const PageContainer = ({ title, children }: PageContainerProps) => {
  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: "#2A3547",
          fontSize: {
            xs: "1.25rem",
            sm: "1.35rem",
            md: "1.5rem",
          },
          lineHeight: 1.4,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default PageContainer;
