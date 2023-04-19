import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TextInputProps = {
  autoComplete?: "off" | "on";
  defaultValue?: string;
  id: string;
  labelText: string;
  register: UseFormRegisterReturn<string>;
  required?: boolean;
  showLabel?: boolean;
  type?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  autoComplete = "off",
  defaultValue,
  id,
  labelText,
  required = false,
  showLabel = false,
  type,
  register,
}) => {
  return (
    <>
      <StyledLabel htmlFor={id} showLabel={showLabel}>
        {labelText}
      </StyledLabel>
      <StyledInput
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        id={id}
        placeholder={showLabel ? "" : labelText}
        required={required}
        type={type}
        {...register}
      />
    </>
  );
};

const StyledLabel = styled.label<{ showLabel: boolean }>(({ showLabel }) => ({
  visibility: showLabel ? "visible" : "hidden",
  height: showLabel ? "auto" : 1,
}));

const StyledInput = styled.input({
  padding: 8,
  border: `1px solid ${theme.colors.mediumGrey}`,
  borderRadius: 4,
});
