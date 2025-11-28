"use client";
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import type { PaginationProps } from "@mui/material/Pagination";
import { useTranslations } from "next-intl";
import EntriesText from "../pagination/entries-text";
import PaginationMui from "../pagination/pagination-mui";

interface Props extends Omit<PaginationProps, "count" | "page" | "onChange"> {
  page: number;
  pageSize: number;
  recordsFiltered: number;
  handleLimitChange: (e: SelectChangeEvent) => void;
  handlePageChange: (event: any, newPage: number) => void;
}

const PaginationSectionTableCustom = ({
  page,
  pageSize,
  recordsFiltered,
  handleLimitChange,
  handlePageChange,
  ...paginationProps
}: Props) => {
  const t = useTranslations("component.shared.pagination");

  return (
    <>
      {recordsFiltered ? (
        <Box
          sx={{
            width: "100%",
            mt: "5px",
            bgcolor: "white",
            pb: 3,
            borderRadius: 1,
            px: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 4,
              py: "5px",
            }}
          >
            <Box
              sx={{
                color: "text.secondary",
                minWidth: "200px",
              }}
            >
              <EntriesText
                currentPage={page}
                pageSize={pageSize}
                totalEntries={recordsFiltered || 0}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                }}
              >
                <Box
                  component="p"
                  sx={{
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                  }}
                >
                  {t("limit")}:{" "}
                </Box>
                <FormControl
                  size="small"
                  sx={{
                    minWidth: "10px",
                    "& .MuiSelect-select": {
                      paddingY: "4px",
                    },
                  }}
                >
                  <Select
                    value={pageSize.toString()}
                    onChange={handleLimitChange}
                    size="small"
                  >
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="15">15</MenuItem>
                    <MenuItem value="25">25</MenuItem>
                    <MenuItem value="50">50</MenuItem>
                    <MenuItem value="100">100</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <PaginationMui
                total={recordsFiltered || 0}
                page={page}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                {...paginationProps}
              />
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default PaginationSectionTableCustom;
