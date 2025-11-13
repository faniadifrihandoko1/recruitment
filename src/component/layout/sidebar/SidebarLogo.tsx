import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

interface SidebarLogoProps {
  href: string;
  isCollapsed: boolean;
}

const SidebarLogo = ({ href, isCollapsed }: SidebarLogoProps) => {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        height: "70px",
        display: "flex",
        alignItems: "center",
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
  );
};

export default SidebarLogo;
