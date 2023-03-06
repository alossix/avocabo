import { useAppDispatch } from "@/store/hooks";
import { removeVocabEntry } from "@/store/vocabSlice";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { ReactEventHandler } from "react";

type DeleteWordProps = {
  emojiId: string;
};

export const DeleteWord: React.FC<DeleteWordProps> = ({ emojiId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleDeleteWordClick: ReactEventHandler<HTMLButtonElement> = () => {
    dispatch(removeVocabEntry({ emojiId }));
  };
  return (
    <DeleteWordContainer>
      <DeleteWordButton
        style={{ cursor: "pointer" }}
        onClick={handleDeleteWordClick}
        aria-label={t("common:button_delete_word")}
      >
        X
      </DeleteWordButton>
    </DeleteWordContainer>
  );
};

const DeleteWordContainer = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
});

const DeleteWordButton = styled.button({});
