import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { SuccessIcon } from "../Icons";
import { InfoIcon, WarningIcon } from "../Icons/";
import { keyframes } from "@emotion/react";
import { useEffect, useState } from "react";

type ToastProps = {
  toastText: string;
  toastType: "error" | "info" | "success" | "warning";
};

const toastIconSwitch = (toastType: ToastProps["toastType"]) => {
  switch (toastType) {
    case "error":
      return <WarningIcon color={theme.colors.UIRed} height={36} width={36} />;
    case "info":
      return <InfoIcon color={theme.colors.UIBlue} height={36} width={36} />;
    case "success":
      return (
        <SuccessIcon color={theme.colors.UIGreen} height={36} width={36} />
      );
    case "warning":
      return (
        <WarningIcon color={theme.colors.UIYellow} height={36} width={36} />
      );
  }
};

export const Toast: React.FC<ToastProps> = ({ toastText, toastType }) => {
  const [isUnmounting, setIsUnmounting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUnmounting(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <ToastContainer
      toastType={toastType}
      onAnimationEnd={() => isUnmounting && setIsUnmounting(false)}
      style={{
        animation: isUnmounting
          ? `${fadeOut} 0.5s ease-out 1 forwards`
          : `${fadeIn} 0.5s ease-in 1 forwards`,
      }}
    >
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
    animation: `${fadeIn} 0.5s ease-in 1 forwards`,
  })
);

const StyledToastText = styled.h3({
  fontWeight: "bold",
  color: theme.colors.black,
});

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
