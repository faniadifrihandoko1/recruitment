"use client";
import { usePathname } from "@/i18n/navigation";
import { Box, Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  hideBreadcrumbs?: boolean;
  hideTitle?: boolean;
}

const PageContainer = ({
  title,
  children,
  hideBreadcrumbs = false,
  hideTitle = false,
}: PageContainerProps) => {
  const pathname = usePathname();
  const locale = useLocale();
  const sidebarTranslations = useTranslations("component.layout.sidebar");
  const menuData = sidebarTranslations.raw("menu") as Array<{
    navlabel?: boolean;
    subheader?: string;
    id?: string;
    title?: string;
    href?: string;
  }> | null;

  const normalizePath = (path?: string | null) => {
    if (!path) {
      return "/";
    }

    const cleaned = path.replace(/\/+/g, "/").replace(/\/$/, "");

    return cleaned || "/";
  };

  const stripLocaleFromPath = useCallback(
    (path: string) => {
      if (!path) {
        return "/";
      }

      const localePrefix = `/${locale}`;
      let trimmedPath = path.startsWith(localePrefix)
        ? path.slice(localePrefix.length)
        : path;

      if (!trimmedPath.startsWith("/")) {
        trimmedPath = `/${trimmedPath}`;
      }

      return normalizePath(trimmedPath);
    },
    [locale]
  );

  const breadcrumbItems = useMemo(() => {
    if (hideBreadcrumbs) {
      return [];
    }

    if (!menuData || !pathname) {
      return title ? [{ label: title }] : [];
    }

    const currentPath = stripLocaleFromPath(pathname);
    let currentSubheader = "";

    for (const item of menuData) {
      if (item?.navlabel) {
        currentSubheader = item?.subheader ?? "";
        continue;
      }

      if (normalizePath(item?.href) === currentPath) {
        const breadcrumbs: BreadcrumbItem[] = [];
        if (currentSubheader) {
          breadcrumbs.push({ label: currentSubheader });
        }
        if (item?.title) {
          breadcrumbs.push({ label: item.title });
        }

        return breadcrumbs.length
          ? breadcrumbs
          : title
            ? [{ label: title }]
            : [];
      }
    }

    return title ? [{ label: title }] : [];
  }, [hideBreadcrumbs, menuData, pathname, title, stripLocaleFromPath]);

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 1.5,
        }}
      >
        <Box>
          {!hideTitle && (
            <Typography
              sx={{
                fontWeight: 600,
                color: "#2A3547",
                fontSize: "1.375rem",
                lineHeight: 1.4,
              }}
            >
              {title}
            </Typography>
          )}
        </Box>

        {!hideBreadcrumbs && breadcrumbItems.length > 0 && (
          <Breadcrumbs
            aria-label="breadcrumb"
            separator="•"
            sx={{
              fontSize: "0.875rem",
              "& .MuiBreadcrumbs-separator": {
                color: "text.disabled",
                fontWeight: 600,
              },
            }}
          >
            {breadcrumbItems.map((item, index) => {
              const isLast = index === breadcrumbItems.length - 1;

              if (isLast || !item.href) {
                return (
                  <Typography
                    key={`${item.label}-${index}`}
                    color="text.primary"
                    fontWeight={600}
                  >
                    {item.label}
                  </Typography>
                );
              }

              return (
                <MuiLink
                  key={`${item.label}-${index}`}
                  component={Link}
                  href={item.href}
                  underline="none"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  {item.label}
                </MuiLink>
              );
            })}
          </Breadcrumbs>
        )}
      </Box>
      {children}
    </Box>
  );
};

export default PageContainer;
