"use client";

import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMemo, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
// import type { Control, FieldValues, Path } from "react-hook-form/dist/types";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import { NumberMaskInput, PhoneMaskInput } from "./input-mask";

export type TextFieldProps<T extends FieldValues = Record<string, any>> = Omit<
  MuiTextFieldProps,
  "name"
> & {
  inputFormat?: "NORMAL" | "NUMBER" | "PRICE" | "PASSWORD" | "PHONE" | "PPN";
  name: Path<T>;
  control: Control<T>;
  onValueChange?: (value: string) => void;
  isReadOnly?: boolean;
  variant?: "standard" | "outlined" | "filled";
  placeholder?: string;
  textUppercase?: boolean;
  textLowercase?: boolean;
  disabled?: boolean;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
};

export function TextFieldMask<T extends FieldValues = Record<string, any>>(
  props: TextFieldProps<T>
) {
  const {
    control,
    inputFormat = "NORMAL",
    onValueChange,
    isReadOnly = false,
    variant,
    placeholder = "",
    textUppercase = false,
    textLowercase = false,
    disabled = false,
    size = "small",
    label,
    required,

    ...moreProps
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPasswordType = inputFormat === "PASSWORD";

  const t = useTranslations("comon");

  const inputComponent: any = useMemo(() => {
    switch (inputFormat) {
      case "PRICE":
      case "PPN":
      case "NUMBER":
        return NumberMaskInput;

      case "PHONE":
        return PhoneMaskInput;

      default:
        return undefined;
    }
  }, [inputFormat]);

  const endAdornment = useMemo(() => {
    switch (inputFormat) {
      case "PASSWORD":
        return (
          <InputAdornment position="end">
            <IconButton
              disabled={disabled}
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? (
                <VisibilityOffRoundedIcon fontSize="small" />
              ) : (
                <VisibilityRoundedIcon fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        );
      case "PPN":
        return <InputAdornment position="start">%</InputAdornment>;

      default:
        return moreProps.InputProps?.endAdornment;
    }
  }, [inputFormat, showPassword, disabled, moreProps.InputProps?.endAdornment]);

  const startAdornment = useMemo(() => {
    switch (inputFormat) {
      case "PHONE":
        return (
          <InputAdornment position="start">
            <Typography>+62</Typography>
          </InputAdornment>
        );

      case "PRICE":
        return (
          <InputAdornment
            style={{ backgroundColor: "#f5f5f5" }}
            position="start"
          >
            Rp
          </InputAdornment>
        );

      default:
        return moreProps.InputProps?.startAdornment;
    }
  }, [inputFormat, moreProps.InputProps?.startAdornment]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
      <Typography fontWeight={600}>
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <Controller
        render={({ field, fieldState, formState: { isSubmitSuccessful } }) => {
          const error = !isSubmitSuccessful && Boolean(fieldState?.error);

          // const helperText = !isSubmitSuccessful && fieldState?.error?.message;

          const { onChange, ...moreField } = field;

          return (
            <MuiTextField
              {...moreProps}
              {...moreField}
              error={error}
              fullWidth
              onChange={(e: any) => {
                if (textUppercase) {
                  if (onValueChange) {
                    onValueChange(e.target.value.toUpperCase());
                  }
                  onChange(e.target.value.toUpperCase());
                } else if (textLowercase) {
                  const modifiedValue = e.target.value
                    .toLowerCase()
                    .replace(/\s+/g, "_");
                  if (onValueChange) {
                    onValueChange(modifiedValue);
                  }
                  onChange(modifiedValue);
                } else {
                  if (onValueChange) {
                    onValueChange(e.target.value);
                  }
                  onChange(e.target.value);
                }
              }}
              helperText={error && t("validation.required")}
              type={
                !isPasswordType
                  ? moreProps.type
                  : showPassword
                    ? "text"
                    : "password"
              }
              size={size}
              disabled={disabled}
              InputLabelProps={{ shrink: true }}
              placeholder={
                !disabled
                  ? placeholder
                    ? placeholder
                    : `${props?.label || ""}...`
                  : undefined
              }
              InputProps={{
                ...moreProps.InputProps,
                inputComponent,
                endAdornment,
                startAdornment,
                autoComplete: "off",
                readOnly: isReadOnly,
                sx: {
                  fontSize: 14,
                  backgroundColor: disabled ? "#f5f5f5" : "white",
                  color: disabled ? "#9e9e9e" : "inherit",
                  cursor: disabled ? "not-allowed" : "text",
                  "& .MuiInputAdornment-root": {
                    color: disabled ? "#9e9e9e" : "inherit",
                  },
                },
              }}
              variant={variant}
              sx={{
                pl: variant === "standard" ? 1 : 0,
                "& .MuiInputBase-input:hover": {
                  cursor: isReadOnly ? "default" : "",
                },
                // backgroundColor: disabled ? 'grey' : '',
              }}
            />
          );
        }}
        name={props.name}
        control={control}
      />
    </Box>
  );
}
