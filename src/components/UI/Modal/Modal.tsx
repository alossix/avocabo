import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { ReactPortal } from "../ReactPortal";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  setOn: () => void;
  title?: string;
};

export const Modal = ({ children, isOpen, setOn, title }: ModalProps) => {
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
          {/* Modal Heading */}
          <div>
            <h3>{title}</h3>
          </div>
          {children}
          {/* Modal CTA */}
          <div>
            <button onClick={() => setOn()}>Cancel and close</button>
          </div>
        </ModalContent>
      </ModalBackdrop>
    </ReactPortal>
  );
};

const ModalBackdrop = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

const ModalContent = styled.section({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
  backgroundColor: theme.colors.white,
  width: 480,
  height: 480,
});
