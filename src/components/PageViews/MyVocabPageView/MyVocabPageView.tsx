import { useAppSelector } from "@/store/hooks";
import { vocabSelector } from "@/store/slices/vocabSlice";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { VocabCard } from "../../Vocab/VocabCard";

export const MyVocabPageView: React.FC = () => {
  const { t } = useTranslation("vocab");
  const vocab = useAppSelector(vocabSelector);

  return (
    <VocabWindowContainer>
      <h2>{t("vocab:vocab_list_title")}</h2>
      <VocabCardsContainer>
        {vocab.map((vocabWord) => (
          <VocabCard vocabWord={vocabWord} key={vocabWord.emojiId} />
        ))}
      </VocabCardsContainer>
    </VocabWindowContainer>
  );
};

const VocabWindowContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  overflowX: "scroll",
});

const VocabCardsContainer = styled.div({
  display: "flex",
  gap: 8,
  overflowX: "scroll",
});
