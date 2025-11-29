import React, { ReactNode } from "react";

import { Box, Tooltip } from "@mui/material";
import { IconPoint } from "@tabler/icons-react";
import Link from "next/link";
import { Menu, MenuItem, Submenu } from "react-mui-sidebar";

import { buildLocalizedHref, isActivePath, normalizePath } from "./utils";

export interface SidebarNavItem {
  id?: string;
  title?: string;
  icon?: React.ElementType;
  href?: string;
  subheader?: string;
  navlabel?: boolean;
  children?: SidebarNavItem[];
  /**
   * Path child (misalnya "edit/{id}") yang masih dianggap bagian
   * dari menu ini untuk penentuan active state, meskipun tidak
   * ditampilkan di sidebar.
   */
  childPaths?: string[];
}

interface SidebarMenuProps {
  items: SidebarNavItem[];
  currentPath: string;
  locale: string;
  isCollapsed: boolean;
}

const SidebarMenu = ({
  items,
  currentPath,
  locale,
  isCollapsed,
}: SidebarMenuProps) => {
  const normalizedCurrentPath = normalizePath(currentPath);

  const renderItems = (menuItems: SidebarNavItem[]): ReactNode => {
    return menuItems.map(item => {
      if (item.subheader) {
        if (isCollapsed) return null;

        return <Menu subHeading={item.subheader} key={item.subheader} />;
      }

      const Icon = item.icon ? item.icon : IconPoint;
      const itemIcon = <Icon stroke={1.5} size="1.3rem" />;
      const localizedHref = buildLocalizedHref(item.href, locale);
      const normalizedTargetPath = normalizePath(localizedHref);

      // Cek active berdasarkan href utama menu
      let isSelected = isActivePath(
        normalizedCurrentPath,
        normalizedTargetPath
      );

      // Jika belum active, cek juga berdasarkan daftar childPaths,
      // misalnya child "edit/{id}" akan dianggap bagian dari "/projects".
      if (!isSelected && item.childPaths && item.childPaths.length > 0) {
        isSelected = item.childPaths.some(childPattern => {
          if (!item.href) return false;

          // Ambil bagian path sebelum placeholder {id}, dll.
          const baseChild = childPattern.split("{")[0].replace(/\/+$/, "");

          if (!baseChild) return false;

          const parentBase = item.href.replace(/\/+$/, "");
          const fullChildHref = `${parentBase}/${baseChild}`;
          const localizedChildHref = buildLocalizedHref(fullChildHref, locale);
          const normalizedChildTarget = normalizePath(localizedChildHref);

          return isActivePath(normalizedCurrentPath, normalizedChildTarget);
        });
      }

      if (item.children && item.children.length > 0) {
        if (isCollapsed) {
          return (
            <Tooltip key={item.id} title={item.title} placement="right" arrow>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  my: 0.5,
                }}
              >
                <Box
                  component={Link}
                  href={localizedHref || "#"}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "48px",
                    height: "48px",
                    borderRadius: "8px",
                    backgroundColor: isSelected ? "#13DEB9" : "transparent",
                    color: isSelected ? "white" : "inherit",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: isSelected
                        ? "#13DEB9"
                        : "rgba(0, 0, 0, 0.04)",
                    },
                    "& svg": {
                      display: "block",
                      margin: "auto",
                    },
                  }}
                >
                  {itemIcon}
                </Box>
              </Box>
            </Tooltip>
          );
        }

        return (
          <Submenu
            key={item.id}
            title={item.title}
            icon={itemIcon}
            borderRadius="7px"
          >
            {renderItems(item.children)}
          </Submenu>
        );
      }

      if (isCollapsed) {
        return (
          <Tooltip key={item.id} title={item.title} placement="right" arrow>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                my: 0.5,
              }}
            >
              <Box
                component={Link}
                href={localizedHref}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  backgroundColor: isSelected ? "#13DEB9" : "transparent",
                  color: isSelected ? "white" : "inherit",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: isSelected
                      ? "#13DEB9"
                      : "rgba(0, 0, 0, 0.04)",
                  },
                  "& svg": {
                    display: "block",
                    margin: "auto",
                  },
                }}
              >
                {itemIcon}
              </Box>
            </Box>
          </Tooltip>
        );
      }

      return (
        <Box px={1} key={item.id}>
          <MenuItem
            key={item.id}
            isSelected={isSelected}
            borderRadius="8px"
            icon={itemIcon}
            link={localizedHref}
            component={Link}
          >
            {item.title}
          </MenuItem>
        </Box>
      );
    });
  };

  return <>{renderItems(items)}</>;
};

export default SidebarMenu;
