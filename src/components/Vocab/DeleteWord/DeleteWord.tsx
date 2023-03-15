import { useAppDispatch } from "@/store/hooks";
import { removeVocabEntryDB } from "@/store/slices/vocabSlice";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { ReactEventHandler } from "react";

type DeleteWordProps = {
  vocabId: string;
};

export const DeleteWord: React.FC<DeleteWordProps> = ({ vocabId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleDeleteWordClick: ReactEventHandler<HTMLButtonElement> = () => {
    dispatch(removeVocabEntryDB(vocabId));
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
});

const DeleteWordButton = styled.button({
  display: "flex",
  alignItems: "center",
  fontSize: 15,
  fontWeight: "bold",
  height: 24,
  width: 24,
  padding: 6,
  border: `1px solid ${theme.colors.black}`,
  borderRadius: 4,
  backgroundColor: theme.colors.white,

  "&:hover": {
    backgroundColor: theme.colors.lightGrey,
    borderColor: theme.colors.darkGrey,
    color: theme.colors.darkGrey,
  },
});
