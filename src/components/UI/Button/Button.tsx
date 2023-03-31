import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

type ButtonProps = {
  ariaLabel: string;
  children?: React.ReactNode;
  colorSet?: "black" | "green";
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  title: string;
  type?: "button" | "submit" | "reset";
};

export const Button: React.FC<ButtonProps> = ({
  ariaLabel,
  children,
  colorSet = "green",
  disabled = false,
  onClick,
  onKeyDown,
  title,
  type = "button",
}) => {
  return (
    <ButtonComponent
      aria-label={ariaLabel}
      colorSet={colorSet}
      disabled={disabled}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      title={title}
      type={type}
      role="button"
    >
      {children}
    </ButtonComponent>
  );
};

const ButtonComponent = styled.button<{
  colorSet: "green" | "black";
  disabled: boolean;
}>(({ colorSet, disabled }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    colorSet === "green" ? theme.colors.lightAvocado : theme.colors.black,
  padding: "8px 16px",
  color: theme.colors.white,
  fontWeight: "bold",
  borderRadius: 4,
  border:
    colorSet === "green"
      ? `3px solid ${theme.colors.lightAvocado}`
      : `3px solid ${theme.colors.black}`,
  transition: "all 0.5s ease",
  cursor: disabled ? "not-allowed" : "pointer",

  "&:hover": {
    background: theme.colors.white,
    color:
      colorSet === "green" ? theme.colors.lightAvocado : theme.colors.black,
  },
}));
