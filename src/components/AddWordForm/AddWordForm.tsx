import { useAppDispatch } from "@/store/hooks";
import { addVocabEntry } from "@/store/vocabSlice";
import { Vocab } from "@/types/vocab";
import useTranslation from "next-translate/useTranslation";
import { SubmitHandler, useForm } from "react-hook-form";

type AddWordFormProps = Vocab;

export const AddWordForm: React.FC = () => {
  const { t } = useTranslation("vocab");
  const { register, handleSubmit } = useForm<AddWordFormProps>();
  const dispatch = useAppDispatch();

  const handleFormSubmit: SubmitHandler<AddWordFormProps> = (vocabWordData) => {
    dispatch(addVocabEntry(vocabWordData));
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label>Emoji</label>
      <input {...register("emojiId")} />

      <label>{t("vocab:word")}</label>
      <input {...register("definition")} />

      <input type="submit" />
    </form>
  );
};
