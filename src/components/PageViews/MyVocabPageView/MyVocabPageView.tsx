import { VocabCard } from "@/components/Vocab/VocabCard";
import { theme } from "@/styles/theme";
import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";

type MyVocabPageViewProps = {
  vocabList: Vocab[];
};

export const MyVocabPageView: React.FC<MyVocabPageViewProps> = ({
  vocabList,
}) => {
  const { t } = useTranslation("vocab");

  return (
    <VocabWindowContainer>
      <h2>{t("vocab:vocab_list_title")}</h2>
      <VocabCardsContainer>
        {vocabList.map((vocabWord) => (
          <VocabCard vocabWord={vocabWord} key={vocabWord.vocabId} />
        ))}
      </VocabCardsContainer>
    </VocabWindowContainer>
  );
};

const VocabWindowContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: "100%",
});

const VocabCardsContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 8,

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    flexDirection: "row",
    overflowX: "scroll",
  },
});
