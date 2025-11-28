"use client";
import { Pagination } from "@mui/material";
import type { PaginationProps } from "@mui/material/Pagination";
import React from "react";

interface PaginationMuiProps
  extends Omit<PaginationProps, "count" | "page" | "onChange"> {
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (_event: React.ChangeEvent<unknown>, newPage: number) => void;
}
const PaginationMui: React.FC<PaginationMuiProps> = ({
  total,
  page,
  pageSize,
  onPageChange,
  ...rest
}) => {
  return (
    <>
      {total ? (
        <Pagination
          count={Math.ceil(total / pageSize)}
          page={page}
          onChange={onPageChange}
          shape="rounded"
          color="primary"
          size="small"
          sx={{
            "& .MuiPaginationItem-page": {
              color: "gray", // Warna putih untuk angka
              "&.Mui-selected": {
                color: "white", // Warna putih saat aktif
                backgroundColor: "primary.main", // Tetap warna primary saat aktif
              },
            },
          }}
          {...rest}
        />
      ) : null}
    </>
  );
};

export default PaginationMui;
