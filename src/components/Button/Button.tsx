import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

type ButtonProps = {
  ariaLabel: string;
  children?: React.ReactNode;
  feature?: boolean;
  onClick: React.MouseEventHandler;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>;
  title: string;
};

export const Button: React.FC<ButtonProps> = ({
  ariaLabel,
  children,
  feature = false,
  onClick,
  onKeyDown,
  title,
}) => {
  return (
    <ButtonComponent
      aria-label={ariaLabel}
      feature={feature}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={0}
      title={title}
      type="button"
      role="button"
    >
      {children}
    </ButtonComponent>
  );
};

const ButtonComponent = styled.button<{ feature: boolean }>({
  display: "flex",
  alignItems: "center",
  background: theme.colors.darkAvocado,
  padding: "8px 16px",
  color: theme.colors.white,
  fontWeight: "bold",
  borderRadius: 4,
  border: `3px solid ${theme.colors.darkAvocado}`,
  transition: "all 0.5s ease",

  "&:hover": {
    background: theme.colors.white,
    color: theme.colors.darkAvocado,
  },
});
