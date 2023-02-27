import styled from "@emotion/styled";
import { VocabCard } from "../VocabCard";

export const VocabWindow = () => {
  return (
    <VocabWindowContent>
      This is the main vocab window
      <VocabCardsContainer>
        <VocabCard emojiSymbol={"\u{1F451}"} word="the crown" />
        <VocabCard emojiSymbol={"\u{1F452}"} word="the hat" />
        <VocabCard emojiSymbol={"\u{1F453}"} word="the glasses" />
        <VocabCard emojiSymbol={"\u{1F454}"} word="the shirt" />
        <VocabCard emojiSymbol={"\u{1F455}"} word="the t-shirt" />
        <VocabCard emojiSymbol={"\u{1F456}"} word="the pants" />
      </VocabCardsContainer>
    </VocabWindowContent>
  );
};

const VocabWindowContent = styled.section({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  padding: 8,
});

const VocabCardsContainer = styled.div({
  display: "flex",
  gap: 8,
  border: "2px solid green",
});
