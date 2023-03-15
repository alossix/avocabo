import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

type ButtonProps = {
  ariaLabel: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  title: string;
  type?: "button" | "submit" | "reset";
};

export const Button: React.FC<ButtonProps> = ({
  ariaLabel,
  children,
  disabled = false,
  onClick,
  onKeyDown,
  title,
  type = "button",
}) => {
  return (
    <ButtonComponent
      aria-label={ariaLabel}
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

const ButtonComponent = styled.button<{ disabled: boolean }>(
  ({ disabled }) => ({
    display: "flex",
    alignItems: "center",
    background: theme.colors.darkAvocado,
    padding: "8px 16px",
    color: theme.colors.white,
    fontWeight: "bold",
    borderRadius: 4,
    border: `3px solid ${theme.colors.darkAvocado}`,
    transition: "all 0.5s ease",
    cursor: disabled ? "not-allowed" : "pointer",

    "&:hover": {
      background: theme.colors.white,
      color: theme.colors.darkAvocado,
    },
  })
);
