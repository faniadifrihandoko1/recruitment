"use client";

import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { IconChevronDown } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const theme = useTheme();
  const t = useTranslations("component.layout.header.language");
  const isMenuOpen = Boolean(anchorEl);

  const languages = [
    { code: "id", name: t("id") },
    { code: "en", name: t("en") },
  ];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLocale: string) => {
    handleClose();

    // Get the current path without the locale prefix
    let pathWithoutLocale = pathname;

    // Remove locale prefix if present
    if (pathname.startsWith(`/${locale}/`)) {
      pathWithoutLocale = pathname.replace(`/${locale}`, "");
    } else if (pathname === `/${locale}`) {
      pathWithoutLocale = "/";
    }

    // Ensure path starts with /
    if (!pathWithoutLocale.startsWith("/")) {
      pathWithoutLocale = `/${pathWithoutLocale}`;
    }

    // Build the new path with the new locale
    const newPath =
      pathWithoutLocale === "/"
        ? `/${newLocale}/dashboard`
        : `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        aria-label={t("switch")}
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
        endIcon={
          <IconChevronDown
            size="16"
            stroke="1.5"
            style={{
              transition: "transform 0.2s ease",
              transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        }
        // startIcon={<IconLanguage size="18" stroke="1.6" />}
        sx={{
          borderRadius: 999,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "0.85rem",
          px: 1.5,
          py: 0.75,
          flexShrink: 0,
          color: isMenuOpen
            ? theme.palette.primary.main
            : theme.palette.text.primary,
          borderColor: isMenuOpen
            ? theme.palette.primary.main
            : theme.palette.divider,
          backgroundColor: isMenuOpen
            ? alpha(theme.palette.primary.light, 0.15)
            : alpha(theme.palette.background.paper, 0.8),
          boxShadow: isMenuOpen
            ? `0 4px 14px ${alpha(theme.palette.primary.main, 0.25)}`
            : "none",
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          "&:hover": {
            borderColor: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.light, 0.25),
          },
        }}
      >
        {locale.toUpperCase()}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: "160px",
          },
        }}
      >
        {languages.map(language => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === locale}
            disabled={language.code === locale}
            sx={{
              "&.Mui-selected": {
                backgroundColor:
                  language.code === locale
                    ? theme.palette.primary.light + "20"
                    : "transparent",
                "&:hover": {
                  backgroundColor:
                    language.code === locale
                      ? theme.palette.primary.light + "30"
                      : "transparent",
                },
              },
            }}
          >
            <ListItemIcon>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor:
                    language.code === "id"
                      ? "#E60012"
                      : language.code === "en"
                        ? "#012169"
                        : theme.palette.primary.main,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {language.code.toUpperCase()}
              </Box>
            </ListItemIcon>
            <ListItemText primary={language.name} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageSwitcher;
