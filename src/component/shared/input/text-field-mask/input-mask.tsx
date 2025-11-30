"use client";
import { forwardRef } from "react";
import { IMask, IMaskInput } from "react-imask";

interface MaskInputProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const PhoneMaskInput = forwardRef<any, MaskInputProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props;

    const maskOptions = {
      lazy: false,
    };

    return (
      <IMaskInput
        {...other}
        {...maskOptions}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name, value } })}
        overwrite
        mask={IMask.MaskedNumber}

        // {...other}
        // mask={IMask.MaskedNumber}
        // max={15}
        // thousandsSeparator="-"
        // inputRef={ref}
        // onAccept={(value: any) => onChange({ target: { name, value } })}
        // overwrite
      />
    );
  }
);

export const NumberMaskInput = forwardRef<any, MaskInputProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask={IMask.MaskedNumber}
        inputRef={ref}
        thousandsSeparator="."
        radix="."
        mapToRadix={["."]}
        onAccept={(value: any) => onChange({ target: { name, value } })}
        overwrite
      />
    );
  }
);
