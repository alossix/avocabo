import styled from "@emotion/styled";
import { VocabCard } from "../VocabCard";

export const VocabWindow = () => {
  return (
    <VocabWindowContainer>
      <h2>Title of the vocab window</h2>
      <VocabCardsContainer>
        <VocabCard emojiSymbol={"\u{1F451}"} word="the crown" />
        <VocabCard emojiSymbol={"\u{1F452}"} word="the hat" />
        <VocabCard emojiSymbol={"\u{1F453}"} word="the glasses" />
        <VocabCard emojiSymbol={"\u{1F454}"} word="the shirt" />
        <VocabCard emojiSymbol={"\u{1F455}"} word="the t-shirt" />
        <VocabCard emojiSymbol={"\u{1F456}"} word="the pants" />
      </VocabCardsContainer>
    </VocabWindowContainer>
  );
};

const VocabWindowContainer = styled.section({
  display: "flex",
  flexDirection: "column",
  overflowX: "scroll",
  padding: 8,
});

const VocabCardsContainer = styled.div({
  display: "flex",
  gap: 8,
  overflowX: "scroll",
});
