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

  const vocabById = useMemo(() => {
    const byId: Record<string, Vocab> = {};
    for (const [vocabId, vocab] of Object.entries(allVocab)) {
      byId[vocabId] = vocab;
    }
    return byId;
  }, [allVocab]);

  const vocabListDueToday = useMemo(() => {
    const dueTodayList: Record<string, Vocab> = {};
    for (const [vocabId, vocab] of Object.entries(vocabById)) {
      if (newShortDate(vocab.dueDate) === today) {
        dueTodayList[vocabId] = vocab;
      }
    }
    return dueTodayList;
  }, [vocabById, today]);

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
