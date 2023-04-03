import { Button } from "@/components/UI/Button";
import { handleAppError } from "@/lib/handleAppError";
import { initialVocabProperties } from "@/lib/initialVocab";
import { useAppDispatch } from "@/store/hooks";
import { setAppError } from "@/store/slices/authSlice";
import { addVocabEntryDB } from "@/store/slices/vocabSlice";
import { theme } from "@/styles/theme";
import { Vocab, VocabCategories } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";
import { CategorySelector } from "../CategorySelector";

export const AddWordForm: React.FC = () => {
  const { t } = useTranslation("vocab");
  const { handleSubmit, register } = useForm<Vocab>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentCategory, setCurrentCategory] = useState<VocabCategories>("");
  const registerForm = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const handleFormSubmit: SubmitHandler<Vocab> = (vocabWordData) => {
    const vocabId = uuid4();
    try {
      setIsSubmitting(true);
      dispatch(
        addVocabEntryDB({
          newVocabWord: {
            ...initialVocabProperties,
            ...vocabWordData,
            vocabId,
          },
        })
      );
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
      onSubmit={handleSubmit(handleFormSubmit)}
      ref={registerForm}
      name="add_word_form"
    >
      <InputContainer>
        <label htmlFor="imageURL">Image URL</label>
        <input {...register("imageURL")} id="imageURL" />
      </InputContainer>

      <InputContainer>
        <label htmlFor="definition">{t("vocab:word")}</label>
        <input {...register("definition")} id="definition" required />
      </InputContainer>
      <InputContainer>
        <label htmlFor="description">
          {t("vocab:vocab_description_sentence")}
        </label>
        <input {...register("description")} id="description" />
      </InputContainer>
      <InputContainer>
        <CategorySelector
          currentCategory={currentCategory}
          onCategoryChange={(value) => setCurrentCategory(value)}
          register={register}
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
