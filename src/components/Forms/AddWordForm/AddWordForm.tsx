import { initialVocabProperties } from "@/lib/initialVocab";
import { useAppDispatch } from "@/store/hooks";
import { addVocabEntryDB } from "@/store/slices/vocabSlice";
import { Vocab } from "@/types/vocab";
import useTranslation from "next-translate/useTranslation";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const AddWordForm: React.FC = () => {
  const { t } = useTranslation("vocab");
  const { register, handleSubmit } = useForm<Vocab>();
  const registerForm = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const handleFormSubmit: SubmitHandler<Vocab> = (vocabWordData) => {
    try {
      dispatch(
        addVocabEntryDB({ ...initialVocabProperties, ...vocabWordData })
      );
    } catch (error) {
      console.error(error);
    } finally {
      if (registerForm.current) {
        registerForm.current.reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} ref={registerForm}>
      <label>Emoji</label>
      <input {...register("emojiId")} />

      <label>{t("vocab:word")}</label>
      <input {...register("definition")} />

      <input type="submit" />
    </form>
  );
};
