import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { ReactPortal } from "../ReactPortal";

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

  const handleSaveAndClose = () => {
    console.log(`save and close`);
  };

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <ModalBackdrop onClick={handleBackdropClick}>
        <ModalContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <h3>{title}</h3>
            <button onClick={() => setOn()}>Close</button>
          </div>
          {children}
          <div>
            <button onClick={handleSaveAndClose}>Save and close</button>
          </div>
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
  z-index: 3;
  background-color: transparent;

  @media (min-width: ${theme.breakpoints.desktop}) {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ModalContent = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
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
    width: 480px;
    height: 480px;
  }
`;
