"use client";

import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { IconLanguage } from "@tabler/icons-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const normalizeLocale = (rawLocale: string | string[] | undefined) => {
  if (!rawLocale) return "id";

  if (Array.isArray(rawLocale)) {
    return rawLocale[0] || "id";
  }

  return rawLocale;
};

const LanguageSwitcher = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const theme = useTheme();
  const t = useTranslations("component.layout.header.language");

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

    // Set cookie for locale persistence
    if (typeof window !== "undefined") {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; sameSite=lax`;
    }

    router.push(newPath);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label={t("switch")}
        color="inherit"
        aria-controls="language-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          ...(Boolean(anchorEl) && {
            color: "primary.main",
          }),
          flexShrink: 0,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <IconLanguage size="21" stroke="1.5" />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
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
            sx={{
              "&.Mui-selected": {
                backgroundColor: theme.palette.primary.light + "20",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light + "30",
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
