"use client";
import LoadingSVG from "@/svg/loading.svg";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { keyframes } from "@mui/system";
import Image from "next/image";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Loading = () => {
  return (
    <Backdrop
      open
      sx={{
        zIndex: 9999,
        backgroundColor: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2.5,
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
          }}
        >
          <CircularProgress
            size={80}
            thickness={4}
            sx={{
              color: "#13DEB9",
              position: "absolute",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: `${spin} 2s linear infinite`,
            }}
          >
            <Image
              src={LoadingSVG}
              alt="Loading"
              width={50}
              height={50}
              priority
            />
          </Box>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "#2A3547",
            fontWeight: 500,
            fontSize: "0.9375rem",
            letterSpacing: "0.01em",
          }}
        >
          Memuat...
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default Loading;
