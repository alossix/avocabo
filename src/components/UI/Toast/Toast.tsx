import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { SuccessIcon } from "../Icons";
import { InfoIcon, WarningIcon } from "../Icons/";

type ToastProps = {
  toastText: string;
  toastType: "error" | "info" | "success" | "warning";
};

const toastIconSwitch = (toastType: ToastProps["toastType"]) => {
  switch (toastType) {
    case "error":
      return <WarningIcon color={theme.colors.UIRed} height={48} width={48} />;
    case "info":
      return <InfoIcon color={theme.colors.UIBlue} height={48} width={48} />;
    case "success":
      return (
        <SuccessIcon color={theme.colors.UIGreen} height={48} width={48} />
      );
    case "warning":
      return (
        <WarningIcon color={theme.colors.UIYellow} height={48} width={48} />
      );
  }
};

export const Toast: React.FC<ToastProps> = ({ toastText, toastType }) => {
  return (
    <ToastContainer toastType={toastType}>
      {toastIconSwitch(toastType)}
      <StyledToastText>{toastText}</StyledToastText>
    </ToastContainer>
  );
};

const ToastContainer = styled.div<{ toastType: ToastProps["toastType"] }>(
  ({ toastType }) => ({
    display: "flex",
    alignItems: "center",
    padding: 8,
    gap: 8,
    opacity: 0.7,
    backgroundColor:
      toastType === "error"
        ? theme.colors.UILightRed
        : toastType === "info"
        ? theme.colors.UILightBlue
        : toastType === "warning"
        ? theme.colors.UILightYellow
        : theme.colors.UILightGreen,
    borderRadius: 4,
  })
);

const StyledToastText = styled.h3({
  fontWeight: "bold",
  color: theme.colors.black,
});
