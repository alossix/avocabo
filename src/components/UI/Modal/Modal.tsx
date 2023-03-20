import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { ReactPortal } from "../ReactPortal";

type ModalProps = {
  isOpen: boolean;
  setOn: () => void;
  title?: string;
};

export const Modal = ({ isOpen, setOn, title }: ModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOn();
    }
  };

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <ModalBackdrop className="modal" onClick={handleBackdropClick}>
        <ModalContent>
          {/* Modal Heading */}
          <div className="modal__modal-heading">
            <h3 className="modal__modal-title">{title}</h3>
          </div>
          {/* Modal CTA */}
          <div className="modal__modal_flex_row modal__modal_justify_between">
            <button className="modal__modal-btn-close" onClick={() => setOn()}>
              NO, CANCEL
            </button>
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
  justifyContent: "center",
  backgroundColor: theme.colors.white,
  width: 360,
  height: 360,
  opacity: 1,
  filter: "brightness(100%)",
});
