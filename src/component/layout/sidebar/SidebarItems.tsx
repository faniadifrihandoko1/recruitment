"use client";
import { Box, Tooltip } from "@mui/material";
import { IconPoint } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import Menuitems from "./MenuItems";
import UserFooter from "./UserFooter";

const renderMenuItems = (items: any, pathDirect: any, isCollapsed: boolean) => {
  return items.map((item: any) => {
    const Icon = item.icon ? item.icon : IconPoint;

    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      // Hide subheader when collapsed
      if (isCollapsed) return null;

      return <Menu subHeading={item.subheader} key={item.subheader} />;
    }

    //If the item has children (submenu)
    if (item.children) {
      // For collapsed mode, show only icon with tooltip
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
                href={item.href || "#"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "48px",
                  height: "48px",
                  borderRadius: "8px",
                  backgroundColor:
                    pathDirect === item?.href ? "#13DEB9" : "transparent",
                  color: pathDirect === item?.href ? "white" : "inherit",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor:
                      pathDirect === item?.href
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
          {renderMenuItems(item.children, pathDirect, isCollapsed)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem
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
              href={item.href}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                backgroundColor:
                  pathDirect === item?.href ? "#13DEB9" : "transparent",
                color: pathDirect === item?.href ? "white" : "inherit",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    pathDirect === item?.href
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
          isSelected={pathDirect === item?.href}
          borderRadius="8px"
          icon={itemIcon}
          link={item.href}
          component={Link}
        >
          {item.title}
        </MenuItem>
      </Box>
    );
  });
};

interface SidebarItemsProps {
  isCollapsed?: boolean;
}

const SidebarItems = ({ isCollapsed = false }: SidebarItemsProps) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <>
      <MUI_Sidebar
        width={"100%"}
        showProfile={false}
        themeColor={"#13DEB9"}
        themeSecondaryColor={"#02b3a9"}
      >
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header - Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              height: "70px",

              display: "flex",
              alignItems: "center",
              // bgcolor: "red",
              justifyContent: isCollapsed ? "center" : "flex-start",
              px: isCollapsed ? 1 : 3,
              borderBottom: "1px solid #e0e0e0",
              flexShrink: 0,
            }}
          >
            {isCollapsed ? (
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/images/logos/mini-logo-altius.png"
                  alt="logo"
                  height={40}
                  width={40}
                  priority
                  style={{ objectFit: "contain" }}
                />
              </Box>
            ) : (
              <Image
                src="/images/logos/logo.png"
                alt="logo"
                height={60}
                width={220}
                priority
                style={{ objectFit: "contain" }}
              />
            )}
          </Box>

          {/* Items - fills remaining space, scrollable */}
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              overflowX: "hidden",
              px: isCollapsed ? 0 : 1.5,
              pt: isCollapsed ? 1 : 0,
              pb: isCollapsed ? 1 : 0,
              display: "flex",
              flexDirection: "column",
              alignItems: isCollapsed ? "center" : "stretch",
              // custom thin scrollbar
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#eff2f7",
                borderRadius: "12px",
              },
            }}
          >
            {renderMenuItems(Menuitems, pathDirect, isCollapsed)}
          </Box>

          {/* Footer */}
          <Box
            sx={{
              px: isCollapsed ? 0 : 1,
              pt: 1,
              pb: 1,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: isCollapsed ? "center" : "stretch",
            }}
          >
            <UserFooter isCollapsed={isCollapsed} />
          </Box>
        </Box>
      </MUI_Sidebar>
    </>
  );
};
export default SidebarItems;
