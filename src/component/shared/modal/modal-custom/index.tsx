"use client";

import {
  Box,
  Button,
  ButtonProps,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  Divider,
  Slide,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren, ReactNode, forwardRef } from "react";
import IconifyIcon from "../../icon";

interface ModalProps extends PropsWithChildren, Partial<DialogProps> {
  title: string;
  description?: React.ReactNode;
  buttonOkProps?: ButtonProps;
  buttonCancelProps?: ButtonProps;
  buttonDeleteProps?: ButtonProps;
  dialogQuery?: string;
  secondaryAction?: ReactNode;
  dialogContentProps?: DialogContentProps;
  open: boolean;
  toggle: () => void;
  hideButton?: boolean;
  isLoadingButton?: boolean;
  handleDelete?: () => void;
  hiddenClose?: boolean;
  customDialogActions?: ReactNode; // [BARU] untuk custom dialog actions
  customDialogTitle?: ReactNode; // [BARU] untuk custom konten title dialog
  activeOnClose?: boolean;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ModalCustom = (props: ModalProps) => {
  const t = useTranslations("component.shared.modal");

  const {
    title,
    description,
    handleDelete,
    hideButton,
    isLoadingButton = false,
    children,
    open,
    toggle,
    buttonDeleteProps,
    buttonOkProps,
    buttonCancelProps,
    secondaryAction = null,
    dialogContentProps = {},
    hiddenClose,
    customDialogActions, // [BARU]
    customDialogTitle,
    activeOnClose = false,
    ...dialogProps
  } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const onClose = () => {
    if (!hiddenClose) {
      toggle();
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={activeOnClose ? onClose : undefined}
      scroll="body"
      TransitionComponent={Transition}
      {...dialogProps}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          overflow: "visible",
          boxShadow: theme.shadows[10],
        },
      }}
    >
      <DialogTitle
        sx={{
          px: 3,
          py: 1.75,
          fontWeight: 600,
          fontSize: "1.25rem",
          position: "relative",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          textTransform: "capitalize",
          flexDirection: "row",
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          {customDialogTitle ?? (
            <>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              {description &&
                (typeof description === "string" ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 400,
                      fontSize: "0.9rem",
                      // fontStyle: "italic",
                      lineHeight: 1.5,
                      mb: 0.5,
                    }}
                  >
                    {description}
                  </Typography>
                ) : (
                  description
                ))}
            </>
          )}
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent
        {...dialogContentProps}
        sx={{
          px: 3,
          py: 2,
          maxHeight: fullScreen ? "100%" : "65vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ccc",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f5f5f5",
          },
          ...dialogContentProps?.sx,
        }}
      >
        <Box>{children}</Box>
      </DialogContent>

      {!hideButton && (
        <>
          <Divider />
          {customDialogActions ? (
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                px: 3,
                py: 1.75,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {customDialogActions}
            </DialogActions>
          ) : (
            <DialogActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                px: 3,
                pt: 1.75,
                pb: 2,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {secondaryAction && <Box>{secondaryAction}</Box>}

              <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
                {handleDelete && (
                  <Button
                    color="error"
                    variant="outlined"
                    size="medium"
                    onClick={handleDelete}
                    startIcon={
                      <IconifyIcon icon="material-symbols:delete-outline-rounded" />
                    }
                    {...buttonDeleteProps}
                  >
                    {buttonDeleteProps?.children || "Hapus"}
                  </Button>
                )}
                <Button
                  variant="outlined"
                  onClick={toggle}
                  size="medium"
                  {...buttonCancelProps}
                >
                  {buttonCancelProps?.children || t("button.no")}
                </Button>
                <Button
                  variant="contained"
                  onClick={toggle}
                  size="medium"
                  disabled={isLoadingButton}
                  sx={{ color: "white" }}
                  startIcon={
                    isLoadingButton ? (
                      <CircularProgress size={18} sx={{ color: "white" }} />
                    ) : (
                      <IconifyIcon icon="material-symbols:check-circle-outline-rounded" />
                    )
                  }
                  {...buttonOkProps}
                >
                  {buttonOkProps?.children || t("button.yes")}
                </Button>
              </Box>
            </DialogActions>
          )}
        </>
      )}
    </Dialog>
  );
};

export default ModalCustom;
