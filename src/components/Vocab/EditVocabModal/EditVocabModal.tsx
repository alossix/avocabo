import { Modal } from "@/components/UI/Modal";
import { formatDateYearMonthDay } from "@/lib/dates";
import { Vocab } from "@/types/vocab";
import useTranslation from "next-translate/useTranslation";
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
  const { t } = useTranslation("vocab");
  return (
    <Modal
      isOpen={isOpen}
      setOn={() => setOpenModal()}
      title="Edit Vocab Entry"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Image
            src={vocabWord.imageURL}
            alt={vocabWord.definition}
            width={240}
            height={240}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          {Object.entries(vocabWord)
            .filter(([key]) => key !== "imageURL" && key !== "vocabId")
            .map(([key, value]) => (
              <div
                key={key}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <h5>{key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                {key === "dueDate" ||
                key === "createdAt" ||
                key === "lastUpdatedAt" ? (
                  <h6>{formatDateYearMonthDay(value as string)}</h6>
                ) : (
                  <h6>
                    {key === "category"
                      ? t(`vocab:vocab_category_${vocabWord.category}`)
                      : value}
                  </h6>
                )}
              </div>
            ))}
        </div>
      </div>
    </Modal>
  );
};
