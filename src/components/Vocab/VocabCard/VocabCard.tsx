import { formatDateYearMonthDay } from "@/lib/dates";
import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { ReactEventHandler, useState } from "react";
import { DeleteWord } from "../DeleteWord";
import { EmojiComponent } from "../../EmojiComponent";
import { LearningStepper } from "../LearningStepper";

type VocabCardProps = {
  vocabWord: Vocab;
};

export const VocabCard: React.FC<VocabCardProps> = ({ vocabWord }) => {
  const { t } = useTranslation("vocab");
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const dueDate = formatDateYearMonthDay(vocabWord.dueDate);

  const handleOnShowDetailsClick: ReactEventHandler<HTMLDivElement> = () => {
    if (!showDetails) {
      setShowDetails(true);
    }
  };

  const handleOnShowDetailsKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOnShowDetailsClick(event);
    }
  };

  return (
    <CardWrapper
      onClick={handleOnShowDetailsClick}
      onKeyDown={handleOnShowDetailsKeyDown}
      tabIndex={0}
      showDetails={showDetails}
      role="button"
      aria-label={vocabWord.definition}
      aria-pressed={showDetails}
    >
      {showDetails && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            padding: "0 8px",
            height: 32,
          }}
        >
          <h4>{`${t("vocab:vocab_due_date")}: ${dueDate}`}</h4>
          <DeleteWord vocabId={vocabWord.vocabId} />
        </div>
      )}
      <EmojiComponent emojiId={vocabWord.emojiId} word="the crown" />
      {showDetails && (
        <>
          <HR />
          <WordContainer>{vocabWord.definition}</WordContainer>
          <LearningStepper vocabWord={vocabWord} />
        </>
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div<{ showDetails: boolean }>(({ showDetails }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 4,
  border: "1px solid lightgrey",
  padding: "16px 8px",
  minWidth: 336,
  cursor: !showDetails ? "pointer" : "default",
}));

const HR = styled.hr({
  width: "100%",
  height: 1,
  border: "none",
  borderTop: "1.5px solid lightgrey",
  margin: "8px 0",
});

const WordContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: 32,
});
