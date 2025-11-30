"use client";

import { GeneralOption } from "@/types/general-type";
import { Typography } from "@mui/material";
import MuiAutocomplete, {
  AutocompleteProps as MuiAutocompleteProps,
} from "@mui/material/Autocomplete";
import MuiTextField from "@mui/material/TextField";
import { useTranslations } from "next-intl";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

interface StaticAutoCompleteProps<Form extends FieldValues, Option>
  extends Omit<
    MuiAutocompleteProps<Option, boolean, boolean, boolean>,
    "name" | "renderInput"
  > {
  control: Control<Form>;
  name: Path<Form>;
  label: string;
  /** Max height of the dropdown list (e.g. 240 or "40vh"). */
  dropdownMaxHeight?: number | string;
  onValueChange?: MuiAutocompleteProps<
    Option,
    boolean,
    boolean,
    boolean
  >["onChange"];
  variant?: "outlined" | "filled" | "standard";
  readOnly?: boolean;
  disabled?: boolean;
  // placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  hideLabel?: boolean;
}

export function CustomStaticAutoComplete<
  Form extends FieldValues,
  Option = GeneralOption,
>(props: StaticAutoCompleteProps<Form, Option>) {
  const {
    control,
    label,
    name,
    onValueChange,
    variant = "outlined",
    readOnly = false,
    disabled = false,
    required = false,
    hideLabel = false,
    dropdownMaxHeight,
    multiline = false,
    rows = 1,
    ...muiAutoCompleteProps
  } = props;

  const t = useTranslations("component.shared.staticAutoComplete");

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { onChange, ...moreField } = field;

        const error = Boolean(fieldState?.error);
        const helperText = fieldState?.error?.message;
        const hasSelectedValue = Array.isArray((moreField as any).value)
          ? ((moreField as any).value as unknown[]).length > 0
          : Boolean((moreField as any).value);

        return (
          <div>
            {!hideLabel && (
              <Typography fontWeight={600} fontSize={13} gutterBottom>
                {label}
                {required && (
                  <span style={{ color: "red", marginLeft: 1 }}>*</span>
                )}
              </Typography>
            )}
            <MuiAutocomplete<Option, boolean, boolean, boolean>
              {...moreField}
              {...muiAutoCompleteProps}
              style={{ fontSize: 14 }}
              sx={{ width: "100%", ...(muiAutoCompleteProps as any).sx }}
              size="small"
              disabled={disabled}
              readOnly={readOnly}
              forcePopupIcon={!readOnly}
              ListboxProps={{
                ...muiAutoCompleteProps.ListboxProps,
                style: {
                  ...(muiAutoCompleteProps.ListboxProps?.style || {}),
                  ...(dropdownMaxHeight
                    ? { maxHeight: dropdownMaxHeight, overflowY: "auto" }
                    : {}),
                },
              }}
              onChange={(e, value, ...restEvent) => {
                if (onValueChange) {
                  onValueChange(e, value, ...restEvent);
                }

                onChange(
                  value as unknown as
                    | React.ChangeEvent<Element>
                    | PathValue<Form, Path<Form>>
                );
              }}
              componentsProps={{
                popper: {
                  placement: "bottom-start",
                  modifiers: [
                    {
                      name: "flip",
                      enabled: false,
                    },
                  ],
                  sx: {
                    zIndex: 10000,
                    backgroundColor: "#fff",
                    fontSize: 14,
                  },
                },
                paper: {
                  sx: {
                    fontSize: 14,
                  },
                },
              }}
              renderInput={params => (
                <MuiTextField
                  {...params}
                  disabled={disabled}
                  fullWidth
                  // label={props.label}
                  error={error}
                  helperText={error ? helperText : undefined}
                  variant={variant}
                  multiline={multiline}
                  rows={rows}
                  InputLabelProps={{ shrink: true }}
                  placeholder={
                    !readOnly && !hasSelectedValue
                      ? t("placeholder", { label })
                      : undefined
                  }
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      fontSize: 14,
                    },
                  }}
                />
              )}
            />
          </div>
        );
      }}
    />
  );
}
