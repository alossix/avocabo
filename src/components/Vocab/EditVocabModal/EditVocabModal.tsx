import { CategorySelector } from "@/components/Forms/CategorySelector";
import { Button } from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import { updateVocabEntryDB } from "@/store/slices/vocabSlice";
import { useAppDispatch } from "@/store/store";
import { Vocab, VocabCategories } from "@/types/vocab";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
  const { handleSubmit, register } = useForm<Vocab>();
  const { t } = useTranslation("vocab");
  const [currentCategory, setCurrentCategory] = useState<VocabCategories>(
    vocabWord.category
  );
  const dispatch = useAppDispatch();
  const registerForm = useRef<HTMLFormElement>(null);

  const handleSaveAndClose = ({ formData }: { formData: Vocab }) => {
    dispatch(updateVocabEntryDB({ vocabWord: { ...vocabWord, ...formData } }));
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
        <form ref={registerForm} name="edit_word_form">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <CategorySelector
              currentCategory={currentCategory}
              onCategoryChange={(value) => setCurrentCategory(value)}
              register={register}
            />
          </div>
        </form>
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
          onClick={handleSubmit((formData) => handleSaveAndClose({ formData }))}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            handleSubmit((formData) => handleSaveAndClose({ formData }))
          }
          title={t("vocab:vocab_save_close")}
        >
          {t("vocab:vocab_save_close")}
        </Button>
      </div>
    </Modal>
  );
};
