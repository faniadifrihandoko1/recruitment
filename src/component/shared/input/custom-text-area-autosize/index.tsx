import {
  Box,
  FormHelperText,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface CustomTextAreaAutoSizeProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  variant?: "outlined" | "filled" | "standard";
  readOnly?: boolean;
  placeholder?: string;
  disabled?: boolean;
  minRows?: number;
  maxRows?: number;
}

export default function CustomTextAreaAutoSize<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  readOnly = false,
  disabled = false,
  placeholder,
  minRows = 1,
  maxRows,
}: CustomTextAreaAutoSizeProps<T>) {
  const t = useTranslations("component.shared.textField");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0.5,
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
      }}
    >
      <Typography fontWeight={600} fontSize={13}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const error = Boolean(fieldState?.error);
          const helperText = fieldState?.error?.message;

          return (
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  "& textarea": {
                    width: "100%",
                    maxWidth: "100%",
                    fontSize: 14,
                    lineHeight: 1.4375,
                    backgroundColor: disabled ? "#f5f5f5" : "white",
                    color: disabled ? "#9e9e9e" : "inherit",
                    cursor: disabled ? "not-allowed" : "text",
                    borderRadius: "4px",
                    border: error
                      ? "1px solid #d32f2f"
                      : "1px solid rgba(0, 0, 0, 0.23)",
                    paddingTop: "13px",
                    paddingBottom: "11px",
                    paddingLeft: "14px",
                    paddingRight: "14px",
                    fontFamily: "inherit",
                    outline: "none",
                    boxSizing: "border-box",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    transition:
                      "border-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    "&:hover:not(:disabled)": {
                      borderColor: error ? "#d32f2f" : "rgba(0, 0, 0, 0.87)",
                    },
                    "&:focus:not(:disabled)": {
                      borderColor: theme =>
                        error ? "#d32f2f" : theme.palette.primary.main,
                      borderWidth: "2px",
                    },
                    "&:disabled": {
                      cursor: "not-allowed",
                    },
                    "&::placeholder": {
                      color: "rgba(0, 0, 0, 0.6)",
                      opacity: 1,
                      lineHeight: 1.4375,
                    },
                    "&:placeholder-shown": {
                      lineHeight: 1.4375,
                    },
                  },
                }}
              >
                <TextareaAutosize
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabled}
                  placeholder={
                    !disabled
                      ? (placeholder ?? t("placeholder", { label }))
                      : undefined
                  }
                  readOnly={readOnly}
                  required={required}
                  minRows={minRows}
                  maxRows={maxRows}
                  style={{
                    overflow: maxRows ? "auto" : "hidden",
                    overflowY: maxRows ? "auto" : "hidden",
                    overflowX: "hidden",
                  }}
                />
              </Box>
              {error && (
                <FormHelperText
                  sx={{
                    fontSize: 12,
                    margin: "3px 14px 0",
                  }}
                  error
                >
                  {helperText}
                </FormHelperText>
              )}
            </Box>
          );
        }}
      />
    </Box>
  );
}
