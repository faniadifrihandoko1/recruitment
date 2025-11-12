import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image
        src="/images/logos/logo.png"
        alt="logo"
        height={60}
        width={200}
        priority
        style={{ objectFit: "contain" }}
      />
    </LinkStyled>
  );
};

export default Logo;
