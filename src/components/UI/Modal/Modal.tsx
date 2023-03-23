import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import Image from "next/image";
import { useEffect } from "react";
import { ReactPortal } from "../ReactPortal";
import CloseIcon from "/public/icons/close-icon.svg";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setOn: () => void;
  title?: string;
};

export const Modal = ({ children, isOpen, setOn, title }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOn();
    }
  };

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <ModalBackdrop onClick={handleBackdropClick}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              margin: "8px 0",
            }}
          >
            <h3>{title}</h3>
            <CloseButton onClick={() => setOn()}>
              <Image src={CloseIcon} height={24} width={24} alt="close-icon" />
            </CloseButton>
          </div>
          {children}
        </ModalContent>
      </ModalBackdrop>
    </ReactPortal>
  );
};

const ModalBackdrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 4;
  background-color: transparent;

  @media (min-width: ${theme.breakpoints.desktop}) {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ModalContent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${theme.colors.white};
  padding: 16px;
  border-radius: 4px;

  @media (min-width: ${theme.breakpoints.desktop}) {
    position: relative;
    min-width: 520px;
    min-height: 520px;
  }
`;

const CloseButton = styled.button({
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
  cursor: "pointer",
});
