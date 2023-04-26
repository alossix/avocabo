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
import { useCallback, useMemo } from "react";

export const useVocab = () => {
  const dispatch = useAppDispatch();
  const today = newShortDate();
  const allVocab = useAppSelector(vocabSelector);
  const vocabMap = useMemo(() => {
    const map = new Map();
    for (const vocab of allVocab) {
      map.set(vocab.vocabId, vocab);
    }
    return map;
  }, [allVocab]);

  const vocabListDueToday = useMemo(() => {
    const dueTodayList = [];
    for (const vocab of vocabMap.values()) {
      if (newShortDate(vocab.dueDate) === today) {
        dueTodayList.push(vocab);
      }
    }
    return dueTodayList;
  }, [vocabMap, today]);

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
        dueDate: string;
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
          dueDate: vocabWord.dueDate,
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

  const removeVocabEntry = ({ vocabId }: { vocabId: string }) => {
    dispatch(removeVocabEntryDB({ vocabId }));
  };

  const setNextVocabEntriesDueToday = () => {
    dispatch(setNextVocabEntriesDueTodayDB());
  };

  return {
    addVocabEntry,
    changeVocabBox,
    getVocab,
    removeVocabEntry,
    setNextVocabEntriesDueToday,
    updateVocabEntry,
    vocabListDueToday,
  };
};
