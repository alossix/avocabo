import { Button } from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import { formatDateYearMonthDay } from "@/lib/dates";
import { Vocab } from "@/types/vocab";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { DeleteWord } from "../DeleteWord";

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

  const handleSaveAndClose = () => {
    setOpenModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      toggleOpen={() => setOpenModal()}
      title={t("vocab:vocab_edit_entry_title")}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          margin: "8px 0",
        }}
      >
        <DeleteWord vocabId={vocabWord.vocabId} />
        <Button
          ariaLabel={t("vocab:vocab_save_close")}
          colorSet="black"
          onClick={handleSaveAndClose}
          onKeyDown={(e) => e.key === "Enter" && handleSaveAndClose()}
          title={t("vocab:vocab_save_close")}
        >
          {t("vocab:vocab_save_close")}
        </Button>
      </div>
    </Modal>
  );
};
