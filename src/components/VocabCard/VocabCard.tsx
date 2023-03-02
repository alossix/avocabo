import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import { ReactEventHandler, SyntheticEvent, useState } from "react";
import { EmojiComponent } from "../EmojiComponent";
import { LearningStepper } from "../LearningStepper";

type VocabCardProps = {
  vocabWord: Vocab;
};

export const VocabCard: React.FC<VocabCardProps> = ({ vocabWord }) => {
  const [showWord, setShowWord] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleOnClick: ReactEventHandler<HTMLDivElement> = (
    event: SyntheticEvent
  ) => {
    if (!clicked) {
      setClicked(true);
      setShowWord((showWord) => !showWord);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOnClick(event);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  };

  return (
    <CardWrapper
      onClick={handleOnClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      tabIndex={0}
      clicked={clicked}
      role="button"
      aria-label={vocabWord.word}
      aria-pressed={clicked}
    >
      <EmojiComponent emojiId={vocabWord.emojiId} word="the crown" />
      {clicked && (
        <>
          <HR />
          <WordContainer>{showWord && vocabWord.word}</WordContainer>
          <LearningStepper vocabWord={vocabWord} />
        </>
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div<{ clicked: boolean }>(({ clicked }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 4,
  border: "1px solid lightgrey",
  padding: "16px 8px",
  minWidth: 320,
  cursor: !clicked ? "pointer" : "default",
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
