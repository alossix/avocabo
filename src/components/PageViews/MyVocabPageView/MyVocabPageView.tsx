import { Button } from "@/components/UI/Button";
import { VocabCard } from "@/components/Vocab/VocabCard";
import { useVocab } from "@/hooks/useVocab";
import { formatTimeHoursAndMinutes } from "@/lib/datesAndTimes";
import { theme } from "@/styles/theme";
import { AppUser } from "@/types/general";
import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type MyVocabPageViewProps = {
  currentUser: AppUser;
  vocabList: Record<string, Vocab>;
};

export const MyVocabPageView: React.FC<MyVocabPageViewProps> = ({
  currentUser,
  vocabList,
}) => {
  const { t } = useTranslation("vocab");
  const { setNextVocabEntriesDueToday } = useVocab();
  const [refreshKey, setRefreshKey] = useState(0);

  const sortByDueDate = (a: Vocab, b: Vocab) =>
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();

  const dueVocabList = useMemo(
    () =>
      Object.values(vocabList)
        .filter((vocab) => new Date(vocab.dueDate) < new Date())
        .sort(sortByDueDate),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vocabList, refreshKey]
  );

  const nextVocab = useMemo(() => {
    const sortedVocabList = Object.values(vocabList)
      .filter((vocab) => new Date(vocab.dueDate) > new Date())
      .sort(sortByDueDate);
    if (sortedVocabList.length === 0) return null;

    return sortedVocabList.reduce<Vocab>(
      (min, vocab) =>
        new Date(vocab.dueDate) < new Date(min.dueDate) ? vocab : min,
      sortedVocabList[0]
    );
  }, [vocabList]);

  const [timeToNextVocab, setTimeToNextVocab] = useState(
    nextVocab
      ? new Date(nextVocab.dueDate).getTime() - new Date().getTime()
      : null
  );

  const dueCountIsZero = dueVocabList.length === 0;
  const vocabCountIsZero = Object.keys(vocabList).length === 0;

  const handleLoadEntries = useCallback(() => {
    setNextVocabEntriesDueToday();
  }, [setNextVocabEntriesDueToday]);

  useEffect(() => {
    if (timeToNextVocab !== null) {
      const timer = setInterval(() => {
        setTimeToNextVocab(timeToNextVocab - 10000);
        if (timeToNextVocab <= 60000) {
          setRefreshKey((prevKey) => prevKey + 1);
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
        <h2>
          {t("vocab:vocab_no_words")}{" "}
          <Link href="/add-words">{t("vocab:vocab_no_words_add")}</Link>
        </h2>
      ) : (
        <>
          {dueCountIsZero ? (
            <>
              {timeToNextVocab && (
                <h2>
                  {t("vocab:vocab_next_words", {
                    minutes: formatTimeHoursAndMinutes(timeToNextVocab),
                  })}
                </h2>
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
              <h2>
                {t("vocab:vocab_number_of_entries", {
                  count: dueVocabList.length,
                })}
              </h2>
              <VocabCardsContainer>
                <VocabCard
                  currentUser={currentUser}
                  vocabWord={dueVocabList[0]}
                />
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
