"use client";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Breadcrumbs,
  Button,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
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
  breadcrumbItems?: BreadcrumbItem[];
  breadcrumbData?: Record<string, any>; // For dynamic data like project name
  showBackButton?: boolean;
  backHref?: string; // Custom back href, if not provided will use parent breadcrumb
}

const PageContainer = ({
  title,
  children,
  hideBreadcrumbs = false,
  hideTitle = false,
  breadcrumbItems: customBreadcrumbItems,
  breadcrumbData,
  showBackButton = false,
  backHref,
}: PageContainerProps) => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("component.shared.backButton");
  const sidebarTranslations = useTranslations("component.layout.sidebar");
  const menuData = sidebarTranslations.raw("menu") as Array<{
    navlabel?: boolean;
    subheader?: string;
    id?: string;
    title?: string;
    href?: string;
    children?: string[];
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

    // If custom breadcrumb items provided, use them
    if (customBreadcrumbItems && customBreadcrumbItems.length > 0) {
      return customBreadcrumbItems;
    }

    if (!menuData || !pathname) {
      return title ? [{ label: title }] : [];
    }

    const currentPath = stripLocaleFromPath(pathname);
    let currentSubheader = "";
    const breadcrumbs: BreadcrumbItem[] = [];

    // Check for dynamic routes (e.g., /projects/detail/[id])
    const pathSegments = currentPath.split("/").filter(Boolean);

    // Try to match parent menu item first
    for (const item of menuData) {
      if (item?.navlabel) {
        currentSubheader = item?.subheader ?? "";
        continue;
      }

      if (!item?.href) continue;

      const itemPath = normalizePath(item.href);
      const itemPathSegments = itemPath.split("/").filter(Boolean);

      // Check if current path matches menu item path or is a child route
      const isExactMatch = currentPath === itemPath;
      const isChildRoute =
        itemPath !== "/" && currentPath.startsWith(itemPath + "/");

      if (isExactMatch || isChildRoute) {
        // Add subheader if exists
        if (currentSubheader) {
          breadcrumbs.push({ label: currentSubheader });
        }

        // Add parent menu item
        if (item?.title) {
          breadcrumbs.push({
            label: item.title,
            href: item.href,
          });
        }

        // Check if this is a detail/dynamic route (child route)
        // e.g., /projects/detail/123 -> add "Project Name" as last item
        if (isChildRoute && pathSegments.length > itemPathSegments.length) {
          // This is a child route, check if we have breadcrumbData
          if (breadcrumbData?.name) {
            breadcrumbs.push({ label: breadcrumbData.name });
          } else if (params?.id) {
            // Fallback: use ID if no name provided
            breadcrumbs.push({ label: String(params.id) });
          }
        }

        return breadcrumbs.length > 0
          ? breadcrumbs
          : title
            ? [{ label: title }]
            : [];
      }
    }

    // Fallback: exact match
    for (const item of menuData) {
      if (item?.navlabel) {
        currentSubheader = item?.subheader ?? "";
        continue;
      }

      if (normalizePath(item?.href) === currentPath) {
        if (currentSubheader) {
          breadcrumbs.push({ label: currentSubheader });
        }
        if (item?.title) {
          breadcrumbs.push({
            label: item.title,
            href: item.href,
          });
        }

        return breadcrumbs.length
          ? breadcrumbs
          : title
            ? [{ label: title }]
            : [];
      }
    }

    return title ? [{ label: title }] : [];
  }, [
    hideBreadcrumbs,
    menuData,
    pathname,
    title,
    stripLocaleFromPath,
    customBreadcrumbItems,
    breadcrumbData,
    params,
  ]);

  // Determine if back button should be shown
  const shouldShowBackButton =
    showBackButton || (breadcrumbItems.length > 1 && !hideBreadcrumbs);

  // Get back href from parent breadcrumb or use provided backHref
  const getBackHref = () => {
    if (backHref) {
      return backHref;
    }
    // Find the second-to-last breadcrumb item that has href
    const parentBreadcrumb = breadcrumbItems
      .slice(0, -1)
      .reverse()
      .find(item => item.href);

    return parentBreadcrumb?.href || "/";
  };

  const handleBack = () => {
    const href = getBackHref();
    router.push(href);
  };

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {/* Top Row: Back Button (Left) and Breadcrumb (Right) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {/* Back Button - Left */}
          {shouldShowBackButton && (
            <Button
              startIcon={<ArrowBackIcon sx={{ fontSize: "1.125rem" }} />}
              onClick={handleBack}
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "text.secondary",
                borderColor: "#e5eaef",
                fontWeight: 500,
                fontSize: "0.875rem",
                px: 2,
                py: 0.75,
                borderRadius: "8px",
                minWidth: "auto",
                backgroundColor: "white",
                boxShadow: "none",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "#f8f9fa",
                  borderColor: "#13DEB9",
                  color: "#13DEB9",
                  boxShadow: "0 2px 4px rgba(19, 222, 185, 0.1)",
                },
              }}
            >
              {t("label")}
            </Button>
          )}

          {/* Breadcrumb - Right (always aligned to right) */}
          {!hideBreadcrumbs && breadcrumbItems.length > 0 && (
            <Box sx={{ marginLeft: "auto" }}>
              <Breadcrumbs
                aria-label="breadcrumb"
                separator="•"
                sx={{
                  fontSize: "0.875rem",
                  "& .MuiBreadcrumbs-separator": {
                    color: "text.disabled",
                    fontWeight: 600,
                    mx: 0.5,
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
                        sx={{ fontSize: "0.875rem" }}
                      >
                        {item.label}
                      </Typography>
                    );
                  }

                  return (
                    <MuiLink
                      key={`${item.label}-${index}`}
                      component={Link}
                      href={item.href || "#"}
                      underline="none"
                      color="text.secondary"
                      sx={{
                        fontWeight: 500,
                        fontSize: "0.875rem",
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
            </Box>
          )}
        </Box>

        {/* Title */}
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
      {children}
    </Box>
  );
};

export default PageContainer;
