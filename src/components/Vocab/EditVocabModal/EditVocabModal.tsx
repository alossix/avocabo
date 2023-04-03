import { CategorySelector } from "@/components/Forms/CategorySelector";
import { Button } from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import { useVocab } from "@/hooks/useVocab";
import { Vocab, VocabCategories } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const { handleSubmit, register, reset } = useForm<Vocab>({
    defaultValues: vocabWord,
  });
  const { t } = useTranslation("vocab");
  const { updateVocabEntry } = useVocab();
  const [currentCategory, setCurrentCategory] = useState<VocabCategories>(
    vocabWord.category
  );
  const registerForm = useRef<HTMLFormElement>(null);

  const handleSaveAndClose = (formData: Vocab) => {
    updateVocabEntry({
      vocabId: vocabWord.vocabId,
      updatedProperties: formData,
    });

    setOpenModal();
  };

  useEffect(() => {
    reset(vocabWord);
  }, [vocabWord, reset]);

  return (
    <Modal
      aria-label={t("vocab:vocab_edit_entry_title")}
      isOpen={isOpen}
      title={t("vocab:vocab_edit_entry_title")}
      toggleOpen={() => setOpenModal()}
    >
      <ModalContentContainer>
        <ImageContainer>
          <Image
            src={vocabWord.imageURL}
            alt={vocabWord.definition}
            width={240}
            height={240}
            style={{ objectFit: "contain" }}
          />
        </ImageContainer>
        <StyledForm ref={registerForm} name="edit_word_form">
          <CategorySelectorContainer>
            <CategorySelector
              currentCategory={currentCategory}
              onCategoryChange={(value) => setCurrentCategory(value)}
              register={register}
            />
          </CategorySelectorContainer>
          <BottomRowContainer>
            <DeleteWord vocabId={vocabWord.vocabId} />
            <Button
              ariaLabel={t("vocab:vocab_save_close")}
              colorSet="black"
              onClick={handleSubmit(handleSaveAndClose)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSubmit(handleSaveAndClose)(e)
              }
              title={t("vocab:vocab_save_close")}
            >
              {t("vocab:vocab_save_close")}
            </Button>
          </BottomRowContainer>
        </StyledForm>
      </ModalContentContainer>
    </Modal>
  );
};

const ModalContentContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  flex: 1,
});

const ImageContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flex: 1,
});

const CategorySelectorContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const BottomRowContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  margin: "8px 0",
});
