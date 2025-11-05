"use client";
import React from "react";
import Menuitems from "./MenuItems";
import { Box } from "@mui/material";
import {
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from "react-mui-sidebar";
import { IconPoint } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserFooter from "./UserFooter";
import Image from "next/image";

const renderMenuItems = (items: any, pathDirect: any) => {
  return items.map((item: any) => {
    const Icon = item.icon ? item.icon : IconPoint;

    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      // Display Subheader
      return <Menu subHeading={item.subheader} key={item.subheader} />;
    }

    //If the item has children (submenu)
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius="7px"
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    // If the item has no children, render a MenuItem

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

const SidebarItems = () => {
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
            // minHeight: 0,
          }}
        >
          {/* Header - 15vh */}
          <Box
            component={Link}
            href="/"
            sx={{
              height: "70px",
              display: "flex",
              alignItems: "center",
              // padding: "10px",
              px: 3,
              // marginLeft: "10px",
              borderBottom: "1px solid #e0e0e0",
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/logos/logo.png"
              alt="logo"
              height={60}
              width={220}
              priority
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* Items - fills remaining space, scrollable */}
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              overflowY: "auto",
              px: 1,
              // custom thin scrollbar
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#eff2f7",
                borderRadius: "12px",
              },
            }}
          >
            {renderMenuItems(Menuitems, pathDirect)}
          </Box>

          {/* Footer - 15vh */}
          <Box
            sx={{
              height: "15vh",
              px: 1,
              pt: 1,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            <UserFooter />
          </Box>
        </Box>
      </MUI_Sidebar>
    </>
  );
};
export default SidebarItems;
