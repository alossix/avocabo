import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import { ReactEventHandler, useState } from "react";
import { isReturnStatement } from "typescript";
import { EmojiComponent } from "../EmojiComponent";
import { LearningStepper } from "../LearningStepper";

type VocabCardProps = {
  children?: React.ReactNode;
} & Vocab;

export const VocabCard: React.FC<VocabCardProps> = ({ emojiSymbol, word }) => {
  const [showWord, setShowWord] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  const handleOnClick: ReactEventHandler = () => {
    if (!clicked) {
      setClicked(true);
      setShowWord((showWord) => !showWord);
    }
  };
  return (
    <CardWrapper onClick={handleOnClick}>
      <EmojiComponent emojiSymbol={emojiSymbol} word="the crown" />
      <HR />
      <WordContainer>{showWord && word}</WordContainer>
      {clicked && <LearningStepper />}
    </CardWrapper>
  );
};

const CardWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 4,
  border: "1px solid lightgrey",
  padding: 8,
  minWidth: 256,
});

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
