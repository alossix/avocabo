import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import Image from "next/image";
import React, { useCallback } from "react";
import { useEffect, useRef } from "react";
import { ReactPortal } from "../ReactPortal";
import CloseIcon from "/public/icons/close-icon.svg";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
  title?: string;
};

export const Modal = ({ children, isOpen, toggleOpen, title }: ModalProps) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      toggleOpen();
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggleOpen();
      } else if (e.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusableElement = focusableElements?.[0] as HTMLElement;
        const lastFocusableElement = focusableElements?.[
          focusableElements.length - 1
        ] as HTMLElement;

        if (!e.shiftKey && document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }

        if (e.shiftKey && document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      }
      e.stopPropagation();
    },
    [toggleOpen]
  );

  const handleKeyDownOnButton = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    onClick: () => void
  ) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);

      setTimeout(() => {
        if (closeButtonRef.current) {
          closeButtonRef.current.focus();
        }
      }, 100);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen) return null;

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <ModalBackdrop
        onClick={handleBackdropClick}
        ref={backdropRef}
        tabIndex={-1}
      >
        <ModalContent ref={modalRef} tabIndex={0} role="dialog">
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
            <CloseButton
              onClick={() => toggleOpen()}
              onKeyDown={(e) => handleKeyDownOnButton(e, () => toggleOpen())}
              ref={closeButtonRef}
            >
              <Image src={CloseIcon} height={24} width={24} alt="close-icon" />
            </CloseButton>
          </div>
          {React.Children.map(children, (child, index) => {
            if (index === 0) {
              return React.cloneElement(child as React.ReactElement, {
                autoFocus: true,
              });
            }
            return child;
          })}
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

  "&:hover img": {
    opacity: 0.6,
  },
});
