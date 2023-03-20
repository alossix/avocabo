import { Button } from "@/components/UI/Button";
import { initialVocabProperties } from "@/lib/initialVocab";
import { useAppDispatch } from "@/store/hooks";
import { addVocabEntryDB } from "@/store/slices/vocabSlice";
import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";

export const AddWordForm: React.FC = () => {
  const { t } = useTranslation("vocab");
  const { register, handleSubmit } = useForm<Vocab>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
    } catch (error) {
      console.error(error);
    } finally {
      if (registerForm.current) {
        registerForm.current.reset();
        setTimeout(() => {
          setIsSubmitting(false);
        }, 300);
      }
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
        <label htmlFor="description">{t("vocab:description")}</label>
        <input {...register("description")} id="description" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="category">{t("vocab:category")}</label>
        <select {...register("category")} id="category">
          <option value="" disabled></option>
          <option value="adverb">{t("vocab:vocab_category_adverb")}</option>
          <option value="adjective">
            {t("vocab:vocab_category_adjective")}
          </option>
          <option value="conjunction">
            {t("vocab:vocab_category_conjunction")}
          </option>
          <option value="noun">{t("vocab:vocab_category_noun")}</option>
          <option value="phrase">{t("vocab:vocab_category_phrase")}</option>
          <option value="preposition">
            {t("vocab:vocab_category_preposition")}
          </option>
          <option value="pronoun">{t("vocab:vocab_category_pronoun")}</option>
          <option value="verb">{t("vocab:vocab_category_verb")}</option>
          <option value="interjection">
            {t("vocab:vocab_category_other")}
          </option>
        </select>
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
  width: "50%",
  gap: 16,
});

const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});
