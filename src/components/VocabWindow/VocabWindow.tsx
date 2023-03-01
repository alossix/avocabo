import { useAppSelector } from "@/store/hooks";
import styled from "@emotion/styled";
import { VocabCard } from "../VocabCard";

export const VocabWindow = () => {
  const vocab = useAppSelector((state) => state);

  return (
    <VocabWindowContainer>
      <h2>My Vocab List</h2>
      <VocabCardsContainer>
        {vocab.vocab.map((v) => (
          <VocabCard
            currentStep={v.currentStep}
            emojiId={v.emojiId}
            key={v.emojiId}
            multiplier={v.multiplier}
            word={v.word}
          />
        ))}
      </VocabCardsContainer>
    </VocabWindowContainer>
  );
};

const VocabWindowContainer = styled.section({
  display: "flex",
  flexDirection: "column",
  overflowX: "scroll",
  padding: 8,
  border: "2px solid red",
  gridArea: "2 / 3 / 8 / 9",
});

const VocabCardsContainer = styled.div({
  display: "flex",
  gap: 8,
  overflowX: "scroll",
});
