import { useAppDispatch } from "@/store/hooks";
import { removeVocabEntry } from "@/store/vocabSlice";
import { theme } from "@/styles/theme";
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
});

const DeleteWordButton = styled.button({
  display: "flex",
  height: 32,
  padding: 8,
  border: `1px solid ${theme.colors.black}`,
  borderRadius: 4,
  backgroundColor: theme.colors.white,

  "&:hover": {
    backgroundColor: theme.colors.lightGrey,
    borderColor: theme.colors.darkGrey,
    color: theme.colors.darkGrey,
  },
});
