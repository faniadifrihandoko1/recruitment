"use client";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
// components
import Logo from "@/component/layout/logo";
import LoginView from "@/view/auth/login";

const Login2 = () => {
  return (
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          display="flex"
          justifyContent="center"
          alignItems="center"
          size={{
            xs: 12,
            sm: 12,
            lg: 4,
            xl: 3,
          }}
        >
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "600px" }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ bgColor: "red" }}
            >
              <Logo />
            </Box>
            <Stack spacing={3} mt={2}>
              <Typography
                variant="subtitle1"
                textAlign="center"
                color="textSecondary"
              >
                Silakan masuk untuk melanjutkan.
              </Typography>
              <LoginView />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Login2;
