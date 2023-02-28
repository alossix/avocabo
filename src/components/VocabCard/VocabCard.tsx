import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import { ReactEventHandler, useState } from "react";
import { EmojiComponent } from "../EmojiComponent";

type VocabCardProps = {
  children?: React.ReactNode;
} & Vocab;

export const VocabCard: React.FC<VocabCardProps> = ({ emojiSymbol, word }) => {
  const [showWord, setShowWord] = useState<boolean>(false);

  const handleOnClick: ReactEventHandler = () => {
    setShowWord((showWord) => !showWord);
  };
  return (
    <CardWrapper onClick={handleOnClick}>
      <EmojiComponent emojiSymbol={emojiSymbol} word="the crown" />
      {showWord && <p>{word}</p>}
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
