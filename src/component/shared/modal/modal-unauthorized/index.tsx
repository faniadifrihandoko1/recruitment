"use client";

import { useUnauthorizedModal } from "@/context/unauthorized-modal-context";
import { useRouter } from "@/i18n/navigation";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useLocale } from "next-intl";
import IconifyIcon from "../../icon";

const ModalUnauthorized = () => {
  const { open, closeModal } = useUnauthorizedModal();
  const router = useRouter();
  const locale = useLocale();

  const handleLogin = () => {
    closeModal();
    // Clear token from localStorage
    localStorage.removeItem("token");
    // Redirect to login page
    router.push(`/${locale}/authentication/login`);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {}} // Prevent closing by clicking outside
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ px: 3, py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconifyIcon
            icon="material-symbols:error-outline-rounded"
            style={{ fontSize: 32, color: "#f44336" }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Sesi Berakhir
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 2 }}>
        <Typography variant="body1">
          Sesi Anda telah berakhir. Silakan login kembali untuk melanjutkan.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="contained"
          onClick={handleLogin}
          startIcon={<IconifyIcon icon="material-symbols:login-rounded" />}
          sx={{ color: "white" }}
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUnauthorized;
