"use client";

import { useUnauthorizedModal } from "@/context/unauthorized-modal-context";
import { useRouter } from "@/i18n/navigation";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

import { removeSession } from "@/lib/session";
import IconifyIcon from "../../icon";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalUnauthorized = () => {
  const { open, closeModal } = useUnauthorizedModal();
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = () => {
    closeModal();
    // Clear token from localStorage
    removeSession();
    localStorage.removeItem("token");
    // Redirect to login page
    router.push(`/authentication/login`);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}} // Prevent closing by clicking outside
      maxWidth="xs"
      fullWidth
      TransitionComponent={Transition}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          boxShadow: theme.shadows[10],
          overflow: "visible",
        },
      }}
    >
      <DialogContent
        sx={{
          px: 2,
          py: 2,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Icon dengan background circle */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            backgroundColor: theme.palette.error.light,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <IconifyIcon
            icon="material-symbols:error-outline-rounded"
            style={{
              fontSize: 48,
              color: theme.palette.error.main,
            }}
          />
        </Box>

        {/* Title */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 0.5,
            }}
          >
            Sesi Berakhir
          </Typography>

          {/* Message */}
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
              maxWidth: "90%",
            }}
          >
            Sesi Anda telah berakhir. Silakan login kembali untuk melanjutkan.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          display: "flex",
          pb: 2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={handleLogin}
          startIcon={<IconifyIcon icon="material-symbols:login-rounded" />}
          sx={{
            color: "white",
            px: 4,
            py: 1.25,
            borderRadius: 2,
            fontWeight: 600,
            textTransform: "none",
            fontSize: "0.9375rem",
            boxShadow: `0 4px 14px 0 ${theme.palette.primary.main}40`,
            "&:hover": {
              boxShadow: `0 6px 20px 0 ${theme.palette.primary.main}60`,
            },
          }}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUnauthorized;
