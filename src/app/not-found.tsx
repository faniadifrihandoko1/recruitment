"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <html>
      <body>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 2,
            backgroundColor: "#fff",
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Halaman Tidak Ditemukan
          </Typography>
          <Box sx={{ maxWidth: 500, width: "100%" }}>
            <Image
              src="/images/unauthorized.svg"
              alt="Unauthorized Access"
              width={500}
              height={300}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Box>

          <Button
            variant="contained"
            onClick={() => router.back()}
            sx={{
              textTransform: "none",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              color: "#fff",
            }}
          >
            Kembali
          </Button>
        </Box>
      </body>
    </html>
  );
}
