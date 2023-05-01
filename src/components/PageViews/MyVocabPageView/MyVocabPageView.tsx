import { Button } from "@/components/UI/Button";
import { VocabCard } from "@/components/Vocab/VocabCard";
import { useVocab } from "@/hooks/useVocab";
import { formatTimeHoursAndMinutes } from "@/lib/datesAndTimes";
import { theme } from "@/styles/theme";
import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type MyVocabPageViewProps = {
  vocabList: Vocab[];
};

export const MyVocabPageView: React.FC<MyVocabPageViewProps> = ({
  vocabList,
}) => {
  const { t } = useTranslation("vocab");
  const { setNextVocabEntriesDueToday } = useVocab();
  const updateKeyRef = useRef(0);

  const dueVocabList = useMemo(
    () => vocabList.filter((vocab) => new Date(vocab.dueDate) < new Date()),
    [vocabList]
  );

  const nextVocab = useMemo(
    () =>
      vocabList
        .filter((vocab) => new Date(vocab.dueDate) > new Date())
        .reduce<Vocab | null>(
          (min, vocab) =>
            min === null || new Date(vocab.dueDate) < new Date(min.dueDate)
              ? vocab
              : min,
          null
        ),
    [vocabList]
  );

  const [timeToNextVocab, setTimeToNextVocab] = useState(
    nextVocab
      ? new Date(nextVocab.dueDate).getTime() - new Date().getTime()
      : null
  );

  const dueCountIsZero = dueVocabList.length === 0;
  const vocabCountIsZero = vocabList.length === 0;

  const handleLoadEntries = useCallback(() => {
    setNextVocabEntriesDueToday();
  }, [setNextVocabEntriesDueToday]);

  useEffect(() => {
    if (timeToNextVocab !== null) {
      const timer = setInterval(() => {
        setTimeToNextVocab(timeToNextVocab - 10000);
        if (timeToNextVocab - 60000 <= 300000) {
          updateKeyRef.current += 1;
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
    <VocabWindowContainer>
      <h1>{t("vocab:vocab_list_title")}</h1>
      {vocabCountIsZero ? (
        <StyledH3>
          {t("vocab:vocab_no_words")}{" "}
          <Link href="/add-words">{t("vocab:vocab_no_words_add")}</Link>
        </StyledH3>
      ) : (
        <>
          {dueCountIsZero ? (
            <>
              {timeToNextVocab && (
                <StyledH3>
                  {t("vocab:vocab_next_words", {
                    minutes: formatTimeHoursAndMinutes(timeToNextVocab),
                  })}
                </StyledH3>
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
              <StyledH3>
                {t("vocab:vocab_number_of_entries", {
                  count: dueVocabList.length,
                })}
              </StyledH3>
              <VocabCardsContainer>
                <VocabCard vocabWord={dueVocabList[0]} />
              </VocabCardsContainer>
            </>
          )}
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 64,
    width: "100%",
  },
});

const StyledH3 = styled.h3({
  margin: "32px 0",
});
