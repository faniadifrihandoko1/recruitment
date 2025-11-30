"use client";

import { Box, TextField as MuiTextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type TextFieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "search"
  | "date"
  | "datetime-local"
  | "time";

interface CustomTextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  variant?: "outlined" | "filled" | "standard";
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  type?: TextFieldType;
  disablePlaceholder?: boolean; //
  min?: number;
  max?: number;
  InputLabelProps?: {
    shrink?: boolean;
  };
}

export function CustomTextField<T extends FieldValues>({
  control,
  name,
  disabled,
  label,
  required = false,
  variant = "outlined",
  readOnly = false,
  placeholder,
  multiline = false,
  rows = 1,
  type = "text",
  disablePlaceholder,
  min,
  max,
  InputLabelProps,
}: CustomTextFieldProps<T>) {
  const t = useTranslations("component.shared.textField");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      {/* Label */}
      <Typography fontWeight={600} fontSize={13}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      {/* Input Field */}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const error = Boolean(fieldState?.error);
          const helperText = fieldState?.error?.message;

          return (
            <MuiTextField
              {...field}
              value={field.value ?? ""}
              fullWidth
              error={error}
              helperText={helperText}
              variant={variant}
              size="small"
              type={type}
              disabled={disabled}
              placeholder={
                !disabled && !disablePlaceholder
                  ? (placeholder ??
                    (type === "number" ? "0" : t("placeholder", { label })))
                  : undefined
              }
              multiline={multiline}
              rows={multiline ? rows : undefined}
              InputLabelProps={InputLabelProps}
              InputProps={{
                readOnly,
                inputProps: {
                  min: type === "number" ? min : undefined,
                  max: type === "number" ? max : undefined,
                },
                sx: {
                  fontSize: 14,
                  backgroundColor: disabled ? "#f5f5f5" : "white",
                  color: disabled ? "#9e9e9e" : "inherit",
                  cursor: disabled ? "not-allowed" : "text",
                },
              }}
            />
          );
        }}
      />
    </Box>
  );
}
