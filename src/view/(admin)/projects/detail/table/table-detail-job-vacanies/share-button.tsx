"use client";
import { VacanciesInterface } from "@/types/vacancies";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
import { useMemo } from "react";

interface ShareButtonProps {
  row: VacanciesInterface;
}

export function ShareButton({ row }: ShareButtonProps) {
  const t = useTranslations("page.project.detail.jobVacancies");

  // Hardcode URL untuk testing
  const jobUrl = useMemo(() => {
    return `https://example.com/job/${row.id}/${row.name?.toLowerCase().replace(/\s+/g, "-") || "job-vacancy"}`;
  }, [row.id, row.name]);

  const handleCopyLink = async (event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await navigator.clipboard.writeText(jobUrl);
      enqueueSnackbar(t("share.copySuccess") || "Link copied to clipboard!", {
        variant: "success",
        autoHideDuration: 2000,
      });
    } catch {
      enqueueSnackbar(t("share.copyError") || "Failed to copy link", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  // Fungsi untuk truncate URL di tengah jika terlalu panjang
  const truncateUrl = (url: string, maxLength: number = 30) => {
    if (url.length <= maxLength) {
      return url;
    }

    const start = url.substring(0, Math.floor(maxLength / 2) - 3);
    const end = url.substring(url.length - Math.floor(maxLength / 2) + 3);

    return `${start}...${end}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        width: "100%",
        maxWidth: "100%",
      }}
      onClick={event => event.stopPropagation()}
    >
      <Typography
        fontSize={13}
        sx={{
          color: "#5A6A85",
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          minWidth: 0,
          maxWidth: "250px",
          fontFamily: "monospace",
        }}
        title={jobUrl}
      >
        {truncateUrl(jobUrl, 35)}
      </Typography>
      <Tooltip title={t("share.copyLink") || "Copy Link"} arrow>
        <IconButton
          onClick={handleCopyLink}
          size="small"
          sx={{
            width: 28,
            height: 28,
            minWidth: 28,
            padding: 0,
            borderRadius: "6px",
            backgroundColor: "#F5F7FA",
            color: "#5A6A85",
            border: "1px solid #E5EAEF",
            "&:hover": {
              backgroundColor: "#E6FFFA",
              borderColor: "#13DEB9",
              color: "#13DEB9",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <ContentCopyIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
