"use client";
import LoadingSVG from "@/svg/loading.svg";
import Image from "next/image";

import { Backdrop } from "@mui/material";

export default function LoadingPage() {
  return (
    <Backdrop
      open
      sx={{
        zIndex: 9999,
        backgroundColor: "rgba(255, 255, 255, 0.98)", // Ubah jadi hampir solid
        backdropFilter: "blur(6px)", // Tambahkan efek blur
        WebkitBackdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image src={LoadingSVG} alt="Loading" width={50} height={50} priority />
    </Backdrop>
  );
}
