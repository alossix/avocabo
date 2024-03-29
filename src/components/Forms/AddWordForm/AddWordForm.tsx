import { Button } from "@/components/UI/Button";
import { TextInput } from "@/components/UI/TextInput";
import { BlackoutEditor } from "@/components/Vocab/BlackoutEditor";
import { useVocab } from "@/hooks/useVocab";
import { handleAppError } from "@/lib/handleAppError";
import { initialVocabProperties } from "@/lib/vocab";
import { useAppDispatch } from "@/store/hooks";
import { setAppError } from "@/store/slices/authSlice";
import { uploadVocabImage } from "@/store/slices/sliceUtils/vocabUtils";
import { theme } from "@/styles/theme";
import { AppUser } from "@/types/general";
import { Vocab, VocabCategories } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";
import { CategorySelector } from "../CategorySelector";
import { Toast } from "@/components/UI/Toast";

type AddWordFormProps = {
  currentUser: AppUser;
};

export const AddWordForm: React.FC<AddWordFormProps> = ({ currentUser }) => {
  const { addVocabEntry } = useVocab();
  const { t } = useTranslation("vocab");
  const { handleSubmit, register, reset, setValue, watch } = useForm<Vocab>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [blackoutWords, setBlackoutWords] = useState<Record<number, number>>(
    []
  );
  const [currentCategory, setCurrentCategory] = useState<VocabCategories>("");
  const [errorMessageText, setErrorMessageText] = useState<string>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const definitionValue = watch("definition");
  const descriptionValue = watch("description");
  const dispatch = useAppDispatch();
  const registerForm = useRef<HTMLFormElement>(null);
  const vocabId = uuid4();

  const handleSuccess = () => {
    setShowSuccessMessage(true);
  };

  const handleError = (message?: string) => {
    setShowErrorMessage(true);

    if (message) {
      setErrorMessageText(message);
    }
  };

  const handleFormSubmit: SubmitHandler<Vocab> = (vocabWordData) => {
    const { definition } = vocabWordData;
    const userAdded = true;

    if (!definition) {
      handleError(t("vocab:error_definition_required"));
      return;
    }

    try {
      setIsSubmitting(true);
      addVocabEntry({
        newVocabWord: {
          ...initialVocabProperties,
          ...vocabWordData,
          blackoutWords,
          userAdded,
          vocabId,
        },
      });
      handleSuccess();
    } catch (error: unknown) {
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
      handleError();
    } finally {
      reset();
      setIsSubmitting(false);
      setCurrentCategory("");
      setBlackoutWords([]);
    }
  };

  const onSubmit = handleSubmit(handleFormSubmit);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    setShowErrorMessage(false);
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    uploadVocabImage({
      currentUser,
      dispatch,
      event,
      setValue,
      vocabId,
    });
  };

  return (
    <StyledForm
      autoComplete="off"
      name="add_word_form"
      onKeyDown={handleKeyDown}
      onSubmit={onSubmit}
      ref={registerForm}
    >
      <InputContainer>
        <label
          htmlFor="imageURL"
          style={{
            color: theme.colors.lightBlack,
            marginBottom: 4,
          }}
        >
          {t("vocab:vocab_upload_image")}
        </label>
        <input
          type="file"
          id="imageURL"
          onChange={handleUploadImage}
          style={{ color: theme.colors.lightBlack }}
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          id="definition"
          labelText={t("vocab:word")}
          register={register("definition")}
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          id="description"
          labelText={t("vocab:vocab_description_sentence")}
          register={register("description")}
        />
      </InputContainer>
      {descriptionValue && (
        <>
          <BlackoutEditor
            blackoutWords={blackoutWords}
            definition={definitionValue}
            description={descriptionValue}
            setBlackoutWords={setBlackoutWords}
          />
          <InputContainer>
            <p style={{ color: theme.colors.lightBlack, marginLeft: 16 }}>
              {"* "}
              {t("vocab:vocab_blackout_description")}
            </p>
          </InputContainer>
        </>
      )}
      <InputContainer>
        <CategorySelector
          currentCategory={currentCategory}
          onCategoryChange={(value) => setCurrentCategory(value)}
          register={register("category")}
        />
      </InputContainer>
      <InputContainer>
        <TextInput
          id="phonetic-pronunciation"
          labelText={t("vocab:vocab_phonetic_pronunciation")}
          register={register("phoneticPronunciation")}
        />
      </InputContainer>
      <Button
        type="submit"
        disabled={isSubmitting}
        ariaLabel={t("common:submit")}
        title={t("common:submit")}
      >
        {t("common:submit")}
      </Button>

      {showSuccessMessage && (
        <Toast
          duration={3000}
          onClose={() => setShowSuccessMessage(false)}
          toastType="success"
          toastText={t("vocab:vocab_added_success")}
        />
      )}
      {showErrorMessage && (
        <Toast
          duration={10000}
          onClose={() => setShowErrorMessage(false)}
          toastType="error"
          toastText={errorMessageText ?? t("vocab:vocab_added_error")}
        />
      )}
    </StyledForm>
  );
};

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    width: "50%",
  },
});

const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});
