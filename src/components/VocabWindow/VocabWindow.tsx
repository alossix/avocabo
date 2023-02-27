import styled from "@emotion/styled";
import { useState } from "react";
import EmojiComponent from "../EmojiComponent/EmojiComponent";
import { Sidebar } from "../Sidebar";
import { VocabCard } from "../VocabCard";

export const VocabWindow = () => {
  const [showWord, setShowWord] = useState<boolean>(false);

  const handleOnClick = () => {
    setShowWord((showWord) => !showWord);
  };

  return (
    <VocabWindowContent>
      This is the main vocab window
      <VocabCard>
        <EmojiComponent
          emojiSymbol={"\u{1F451}"}
          onClick={handleOnClick}
          showWord={showWord}
          word="the crown"
        />
      </VocabCard>
    </VocabWindowContent>
  );
};

const VocabWindowContent = styled.section({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: 8,
});
