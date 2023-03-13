import { initialVocabProperties } from "@/lib/initialVocab";
import { useAppDispatch } from "@/store/hooks";
import { addVocabEntryDB } from "@/store/slices/vocabSlice";
import { Vocab } from "@/types/vocab";
import useTranslation from "next-translate/useTranslation";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuid4 } from "uuid";

export const AddWordForm: React.FC = () => {
  const { t } = useTranslation("vocab");
  const { register, handleSubmit } = useForm<Vocab>();
  const [disabled, setIsDisabled] = useState<boolean>(false);
  const registerForm = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  const handleFormSubmit: SubmitHandler<Vocab> = (vocabWordData) => {
    const vocabId = uuid4();
    try {
      setIsDisabled(true);
      dispatch(
        addVocabEntryDB({
          ...initialVocabProperties,
          ...vocabWordData,
          vocabId,
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      if (registerForm.current) {
        registerForm.current.reset();
        setTimeout(() => {
          setIsDisabled(false);
        }, 300);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} ref={registerForm}>
      <label>Emoji</label>
      <input {...register("emojiId")} />

      <label>{t("vocab:word")}</label>
      <input {...register("definition")} />

      <button type="submit" disabled={disabled}>
        Submit
      </button>
    </form>
  );
};
