import { useAppSelector } from "@/store/hooks";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { VocabCard } from "../VocabCard";

export const VocabWindow = () => {
  const { t } = useTranslation("vocab");
  const vocab = useAppSelector((state) => state.vocab);

  return (
    <VocabWindowContainer>
      <h2>{t("vocab:vocab_list_title")}</h2>
      <VocabCardsContainer>
        {vocab.map((vocabWord, index) => (
          <VocabCard vocabWord={vocabWord} key={vocabWord.emojiId} />
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
