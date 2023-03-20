import { Modal } from "@/components/UI/Modal";
import { formatDateYearMonthDay } from "@/lib/dates";
import { Vocab } from "@/types/vocab";
import Image from "next/image";

type EditVocabModalProps = {
  isOpen: boolean;
  setOpenModal: () => void;
  vocabWord: Vocab;
};

export const EditVocabModal: React.FC<EditVocabModalProps> = ({
  isOpen,
  setOpenModal,
  vocabWord,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      setOn={() => setOpenModal()}
      title="Edit Vocab Entry"
    >
      <div style={{ border: "2px solid blue" }}>
        <div style={{ maxWidth: 360, maxHeight: 360 }}>
          <Image
            src={vocabWord.imageURL}
            alt={vocabWord.definition}
            width={240}
            height={240}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h6>Category</h6>
          <h6>{vocabWord.category}</h6>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h6>Definition</h6>
          <h6>{vocabWord.definition}</h6>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h6>Due date</h6>
          <h6>{formatDateYearMonthDay(vocabWord.dueDate)}</h6>
        </div>
      </div>
    </Modal>
  );
};
