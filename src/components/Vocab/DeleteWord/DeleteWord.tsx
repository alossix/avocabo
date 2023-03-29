import { useAppDispatch } from "@/store/hooks";
import { removeVocabEntryDB } from "@/store/slices/vocabSlice";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { ReactEventHandler } from "react";
import DeleteIcon from "/public/icons/delete-icon.svg";

type DeleteWordProps = {
  vocabId: string;
};

export const DeleteWord: React.FC<DeleteWordProps> = ({ vocabId }) => {
  const { t } = useTranslation("vocab");
  const dispatch = useAppDispatch();

  const handleDeleteWordClick: ReactEventHandler<HTMLButtonElement> = () => {
    if (window.confirm(t("vocab:vocab_confirm_delete_entry"))) {
      dispatch(removeVocabEntryDB({ vocabId }));
    }
  };

  return (
    <DeleteWordContainer>
      <DeleteWordButton
        onClick={handleDeleteWordClick}
        onKeyDown={(e) => e.key === "Enter" && handleDeleteWordClick(e)}
        aria-label={t("common:button_delete_word")}
        role="button"
      >
        <Image src={DeleteIcon} alt="delete-icon" width={24} height={24} />
      </DeleteWordButton>
    </DeleteWordContainer>
  );
};

const DeleteWordContainer = styled.div({
  display: "flex",
  alignItems: "center",
  margin: -4,
});

const DeleteWordButton = styled.button({
  cursor: "pointer",
  padding: 0,
  height: 24,
  backgroundColor: "transparent",
  border: "none",
  lineHeight: 1,

  "&:hover": {
    opacity: 0.6,
  },
});
