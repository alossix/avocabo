import { Button } from "@/components/UI/Button";
import { TextInput } from "@/components/UI/TextInput";
import { useVocab } from "@/hooks/useVocab";
import { handleAppError } from "@/lib/handleAppError";
import { initialVocabProperties } from "@/lib/initialVocab";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectUserSignedIn, setAppError } from "@/store/slices/authSlice";
import { uploadVocabImage } from "@/store/slices/sliceUtils/vocabUtils";
import { theme } from "@/styles/theme";
import { Vocab, VocabCategories } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";
import { CategorySelector } from "../CategorySelector";

export const AddWordForm: React.FC = () => {
  const { addVocabEntry } = useVocab();
  const { t } = useTranslation("vocab");
  const { handleSubmit, register, setValue } = useForm<Vocab>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<VocabCategories>("");
  const currentUser = useAppSelector(selectUserSignedIn);
  const dispatch = useAppDispatch();
  const registerForm = useRef<HTMLFormElement>(null);
  const vocabId = uuid4();

  const handleFormSubmit: SubmitHandler<Vocab> = (vocabWordData) => {
    try {
      setIsSubmitting(true);
      addVocabEntry({
        newVocabWord: {
          ...initialVocabProperties,
          ...vocabWordData,
          vocabId,
        },
      });
    } catch (error: unknown) {
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
    } finally {
      if (registerForm.current) {
        registerForm.current.reset();
        setTimeout(() => {
          setIsSubmitting(false);
        }, 300);
      }
      setCurrentCategory("");
    }
  };

  return (
    <StyledForm
      autoComplete="off"
      name="add_word_form"
      onSubmit={handleSubmit(handleFormSubmit)}
      ref={registerForm}
    >
      <InputContainer>
        <label
          htmlFor="imageURL"
          style={{
            color: theme.colors.darkGrey,
            marginBottom: 4,
          }}
        >
          {t("vocab:vocab_upload_image")}
        </label>
        <input
          type="file"
          id="imageURL"
          onChange={(event) =>
            uploadVocabImage({
              currentUser,
              dispatch,
              event,
              setValue,
              vocabId,
            })
          }
          style={{ color: theme.colors.darkGrey }}
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
    </StyledForm>
  );
};

const StyledForm = styled.form({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: 16,

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    width: "50%",
  },
});

const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});
