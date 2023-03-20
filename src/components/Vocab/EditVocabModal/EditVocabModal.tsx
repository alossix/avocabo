import { Modal } from "@/components/UI/Modal";

type EditVocabModalProps = {
  isOpen: boolean;
  setOpenModal: () => void;
};

export const EditVocabModal: React.FC<EditVocabModalProps> = ({
  isOpen,
  setOpenModal,
}) => {
  return (
    <Modal isOpen={isOpen} setOn={() => setOpenModal()} title="Vocab Modal">
      <div>test</div>
    </Modal>
  );
};
