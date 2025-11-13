"use client";

import { Box } from "@mui/material";
import { useParams, usePathname } from "next/navigation";
import { Sidebar as MUI_Sidebar } from "react-mui-sidebar";

import Menuitems from "./MenuItems";
import SidebarLogo from "./SidebarLogo";
import SidebarMenu from "./SidebarMenu";
import UserFooter from "./UserFooter";
import { buildLocalizedHref, resolveLocale } from "./utils";

interface SidebarItemsProps {
  isCollapsed?: boolean;
}

const SidebarItems = ({ isCollapsed = false }: SidebarItemsProps) => {
  const pathname = usePathname();
  const params = useParams();
  const locale = resolveLocale(params?.locale as string | string[] | undefined);
  const logoHref = buildLocalizedHref("/", locale);

  return (
    <MUI_Sidebar
      width="100%"
      showProfile={false}
      themeColor="#13DEB9"
      themeSecondaryColor="#02b3a9"
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SidebarLogo href={logoHref} isCollapsed={isCollapsed} />

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
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#eff2f7",
              borderRadius: "12px",
            },
          }}
        >
          <SidebarMenu
            items={Menuitems}
            currentPath={pathname}
            locale={locale}
            isCollapsed={isCollapsed}
          />
        </Box>

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
  );
};

export default SidebarItems;
