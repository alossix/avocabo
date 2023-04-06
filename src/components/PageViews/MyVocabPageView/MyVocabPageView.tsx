import { Button } from "@/components/UI/Button";
import { VocabCard } from "@/components/Vocab/VocabCard";
import { useVocab } from "@/hooks/useVocab";
import { formatTimeHoursAndMinutes } from "@/lib/dates";
import { theme } from "@/styles/theme";
import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect, useCallback } from "react";

type MyVocabPageViewProps = {
  vocabList: Vocab[];
};

export const MyVocabPageView: React.FC<MyVocabPageViewProps> = ({
  vocabList,
}) => {
  const { t } = useTranslation("vocab");
  const { setNextVocabEntriesDueToday } = useVocab();
  const [updateKey, setUpdateKey] = useState(0);

  const dueVocabList = vocabList.filter(
    (vocab) => new Date(vocab.dueDate) < new Date()
  );

  const nextVocab = vocabList
    .filter((vocab) => new Date(vocab.dueDate) > new Date())
    .reduce<Vocab | null>(
      (min, vocab) =>
        min === null || new Date(vocab.dueDate) < new Date(min.dueDate)
          ? vocab
          : min,
      null
    );

  const [timeToNextVocab, setTimeToNextVocab] = useState(
    nextVocab
      ? new Date(nextVocab.dueDate).getTime() - new Date().getTime()
      : null
  );

  const countIsZero = dueVocabList.length === 0;

  const handleLoadEntries = useCallback(() => {
    setNextVocabEntriesDueToday();
  }, [setNextVocabEntriesDueToday]);

  useEffect(() => {
    if (timeToNextVocab !== null) {
      const timer = setInterval(() => {
        setTimeToNextVocab(timeToNextVocab - 10000);
        if (timeToNextVocab - 60000 <= 300000) {
          setUpdateKey((prevKey) => prevKey + 1);
        }
      }, 10000);
      return () => clearInterval(timer);
    }
  }, [timeToNextVocab]);

  useEffect(() => {
    if (nextVocab) {
      setTimeToNextVocab(
        new Date(nextVocab.dueDate).getTime() - new Date().getTime()
      );
    } else {
      setTimeToNextVocab(null);
    }
  }, [nextVocab]);

  return (
    <VocabWindowContainer key={updateKey}>
      <h2>{t("vocab:vocab_list_title")}</h2>
      {countIsZero ? (
        <>
          {timeToNextVocab && (
            <h3>
              {t("vocab:vocab_next_words", {
                minutes: formatTimeHoursAndMinutes(timeToNextVocab),
              })}
            </h3>
          )}
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
            {t("vocab:vocab_number_of_entries", { count: dueVocabList.length })}
          </h3>
          <VocabCardsContainer>
            <VocabCard vocabWord={dueVocabList[0]} />
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
