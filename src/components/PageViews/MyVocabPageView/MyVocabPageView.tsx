import { Button } from "@/components/UI/Button";
import { VocabCard } from "@/components/Vocab/VocabCard";
import { useVocab } from "@/hooks/useVocab";
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
  const { setNextVocabEntriesDueToday } = useVocab();
  const countIsZero = vocabList.length === 0;

  const handleLoadEntries = () => {
    setNextVocabEntriesDueToday();
  };

  return (
    <VocabWindowContainer>
      <h2>{t("vocab:vocab_list_title")}</h2>
      {countIsZero ? (
        <>
          <h3>{t("vocab:vocab_no_more_due")}</h3>
          <Button
            ariaLabel={t("vocab:vocab_load_next_entries")}
            onClick={handleLoadEntries}
            title={t("vocab:vocab_load_next_entries")}
          >
            {t("vocab:vocab_load_next_entries")}
          </Button>
        </>
      ) : (
        <>
          <h3>
            {t("vocab:vocab_number_of_entries", { count: vocabList.length })}
          </h3>
          <VocabCardsContainer>
            <VocabCard vocabWord={vocabList[0]} />
          </VocabCardsContainer>
        </>
      )}
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
