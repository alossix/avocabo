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
import { useAppSelector } from "@/store/hooks";
import { selectUserSignedIn } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { uploadVocabImage } from "@/store/slices/sliceUtils/vocabUtils";
import { TextInput } from "@/components/UI/TextInput";

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
  const { handleSubmit, register, reset, setValue } = useForm<Vocab>({
    defaultValues: vocabWord,
  });
  const { t } = useTranslation("vocab");
  const { updateVocabEntry } = useVocab();
  const [currentCategory, setCurrentCategory] = useState<VocabCategories>(
    vocabWord.category
  );
  const [imageURL, setImageURL] = useState(vocabWord.imageURL);
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector(selectUserSignedIn);
  const dispatch = useAppDispatch();
  const fileInput = useRef<HTMLInputElement>(null);
  const registerForm = useRef<HTMLFormElement>(null);

  const handleSaveAndClose = (formData: Vocab) => {
    updateVocabEntry({
      vocabId: vocabWord.vocabId,
      updatedProperties: formData,
    });

    setOpenModal();
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const newImageURL = await uploadVocabImage({
      currentUser,
      dispatch,
      event,
      setValue,
      vocabId: vocabWord.vocabId,
    });

    if (newImageURL) {
      setImageURL(newImageURL);
    }
    setLoading(false);
  };

  useEffect(() => {
    reset(vocabWord);
    setImageURL(vocabWord.imageURL);
    setCurrentCategory(vocabWord.category);
  }, [vocabWord, reset]);

  return (
    <Modal
      isOpen={isOpen}
      title={t("vocab:vocab_edit_entry_title")}
      toggleOpen={() => setOpenModal()}
    >
      <ModalContentContainer>
        <ImageContainer>
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 240,
                height: 240,
              }}
            >
              <p>Loading...</p>
            </div>
          ) : (
            <>
              <Image
                src={imageURL}
                alt={vocabWord.definition}
                width={240}
                height={240}
                onClick={() => fileInput.current?.click()}
                style={{ objectFit: "contain" }}
              />
              <HiddenInput
                ref={fileInput}
                type="file"
                onChange={handleUpload}
              />
            </>
          )}
        </ImageContainer>
        <StyledForm ref={registerForm} name="edit_word_form">
          <StyledInputContainer>
            <TextInput
              defaultValue={vocabWord.definition}
              id="definition"
              labelText={t("vocab:vocab_definition")}
              register={register("definition")}
              showLabel
              type="text"
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <TextInput
              defaultValue={vocabWord.description}
              id="description"
              labelText={t("vocab:vocab_description")}
              register={register("description")}
              showLabel
              type="text"
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <TextInput
              defaultValue={vocabWord.phoneticPronunciation}
              id="phonetic-pronunciation"
              labelText={t("vocab:vocab_phonetic_pronunciation")}
              register={register("phoneticPronunciation")}
              showLabel
              type="text"
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <CategorySelector
              currentCategory={currentCategory}
              onCategoryChange={(value) => setCurrentCategory(value)}
              register={register("category")}
            />
          </StyledInputContainer>
          <BottomRowContainer>
            <DeleteWord
              vocabId={vocabWord.vocabId}
              setOpenModal={setOpenModal}
            />
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

const HiddenInput = styled.input({
  display: "none",
});

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  flex: 1,
  gap: 16,
});

const StyledInputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const BottomRowContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  margin: "8px 0",
});
