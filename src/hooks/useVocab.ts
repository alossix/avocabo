import { newShortDate } from "@/lib/datesAndTimes";
import { useAppSelector } from "@/store/hooks";
import {
  updateVocabCurrentBox,
  updateVocabDueDate,
} from "@/store/slices/sliceUtils/vocabUtils";
import {
  addVocabEntryDB,
  getVocabDB,
  removeVocabEntryDB,
  setNextVocabEntriesDueTodayDB,
  updateVocabEntryDB,
  vocabSelector,
} from "@/store/slices/vocabSlice";
import { useAppDispatch } from "@/store/store";
import { RecallDifficulty, Vocab } from "@/types/vocab";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useVocab = () => {
  const dispatch = useAppDispatch();
  const today = newShortDate();
  const allVocab = useAppSelector(vocabSelector);

  const vocabListDueToday = () => {
    const dueTodayList: Record<string, Vocab> = {};
    const vocabById = () => {
      const byId: Record<string, Vocab> = {};
      for (const [vocabId, vocab] of Object.entries(allVocab)) {
        byId[vocabId] = vocab;
      }
      return byId;
    };

    for (const [vocabId, vocab] of Object.entries(vocabById())) {
      if (newShortDate(vocab.dueDate) === today) {
        dueTodayList[vocabId] = vocab;
      }
    }
    return dueTodayList;
  };

  const addVocabEntry = ({ newVocabWord }: { newVocabWord: Vocab }) => {
    dispatch(addVocabEntryDB({ newVocabWord }));
  };

  const updateVocabEntry = useCallback(
    ({
      vocabId,
      updatedProperties,
    }: {
      vocabId: string;
      updatedProperties: Partial<Vocab>;
    }) => {
      dispatch(updateVocabEntryDB({ vocabId, updatedProperties }));
    },
    [dispatch]
  );

  const changeVocabBox = useCallback(
    ({
      vocabWord,
      recallDifficulty,
    }: {
      vocabWord: {
        currentBox: number;
        vocabId: string;
      };
      recallDifficulty: RecallDifficulty;
    }) => {
      const updatedProperties: Partial<Vocab> = {
        currentBox: updateVocabCurrentBox({
          currentBox: vocabWord.currentBox,
          recallDifficulty,
        }),
        dueDate: updateVocabDueDate({
          currentBox: vocabWord.currentBox,
          recallDifficulty,
        }),
        lastUpdatedAt: new Date().toISOString(),
      };

      // Call updateVocabEntry to update both local state and database state
      updateVocabEntry({ vocabId: vocabWord.vocabId, updatedProperties });
    },
    [updateVocabEntry]
  );

  const getVocab = ({ userId }: { userId: string }) => {
    dispatch(getVocabDB({ userId }));
  };

  const removeVocabEntry = ({
    imageURL,
    userAdded,
    vocabId,
  }: {
    imageURL?: string;
    userAdded?: boolean;
    vocabId: string;
  }) => {
    dispatch(removeVocabEntryDB({ imageURL, userAdded, vocabId }));
  };

  const setNextVocabEntriesDueToday = () => {
    dispatch(setNextVocabEntriesDueTodayDB());
  };

  const sortByDueDate = (a: Vocab, b: Vocab) =>
    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();

  const dueVocabList = useMemo(() => {
    return Object.values(allVocab)
      .filter((vocab) => new Date(vocab.dueDate) < new Date())
      .sort(sortByDueDate);
  }, [allVocab]);

  const nextVocab = useMemo(() => {
    const sortedVocabList = Object.values(allVocab)
      .filter((vocab) => new Date(vocab.dueDate) > new Date())
      .sort(sortByDueDate);

    if (sortedVocabList.length === 0) return null;

    return sortedVocabList[0];
  }, [allVocab]);

  const [timeToNextVocab, setTimeToNextVocab] = useState(() => {
    if (nextVocab) {
      return new Date(nextVocab.dueDate).getTime() - new Date().getTime();
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (nextVocab) {
      setTimeToNextVocab(
        new Date(nextVocab.dueDate).getTime() - new Date().getTime()
      );
    } else {
      setTimeToNextVocab(null);
    }
  }, [nextVocab]);

  return {
    addVocabEntry,
    changeVocabBox,
    dueVocabList,
    getVocab,
    removeVocabEntry,
    setNextVocabEntriesDueToday,
    timeToNextVocab,
    updateVocabEntry,
    vocabListDueToday,
  };
};
