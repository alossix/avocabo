import { VocabCard } from "@/components/Vocab/VocabCard";
import { useAppSelector } from "@/store/hooks";
import { vocabSelector } from "@/store/slices/vocabSlice";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";

export const MyVocabPageView: React.FC = () => {
  const { t } = useTranslation("vocab");
  const vocabList = useAppSelector(vocabSelector);
  console.log(vocabList);

  return (
    <VocabWindowContainer>
      <h2>{t("vocab:vocab_list_title")}</h2>
      <VocabCardsContainer>
        {vocabList.map((vocabWord) => (
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
