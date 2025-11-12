"use client";
import React from "react";
import { Box, Paper } from "@mui/material";

interface DashboardCardProps {
  children: React.ReactNode;
  sx?: any;
}

const DashboardCard = ({ children, sx }: DashboardCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid #e5eaef",
        backgroundColor: "#ffffff",
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};

export default DashboardCard;
