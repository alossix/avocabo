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

export const useVocab = () => {
  const dispatch = useAppDispatch();
  const today = new Date().toLocaleDateString();
  const vocabListDueToday = useAppSelector(vocabSelector).filter(
    (vocab) => new Date(vocab.dueDate).toLocaleDateString() === today
  );

  const addVocabEntry = ({ newVocabWord }: { newVocabWord: Vocab }) => {
    dispatch(addVocabEntryDB({ newVocabWord }));
  };

  const changeVocabBox = ({
    vocabWord,
    recallDifficulty,
  }: {
    vocabWord: Vocab;
    recallDifficulty: RecallDifficulty;
  }) => {
    const updatedProperties: Partial<Vocab> = {
      currentBox: updateVocabCurrentBox({
        currentBox: vocabWord.currentBox,
        recallDifficulty,
      }),
      dueDate: updateVocabDueDate({ vocab: vocabWord, recallDifficulty }),
      lastUpdatedAt: new Date().toISOString(),
    };

    // Call updateVocabEntry to update both local state and database state
    updateVocabEntry({ vocabId: vocabWord.vocabId, updatedProperties });
  };

  const getVocab = ({ userId }: { userId: string }) => {
    dispatch(getVocabDB({ userId }));
  };

  const removeVocabEntry = ({ vocabId }: { vocabId: string }) => {
    dispatch(removeVocabEntryDB({ vocabId }));
  };

  const setNextVocabEntriesDueToday = () => {
    dispatch(setNextVocabEntriesDueTodayDB());
  };

  const updateVocabEntry = ({
    vocabId,
    updatedProperties,
  }: {
    vocabId: string;
    updatedProperties: Partial<Vocab>;
  }) => {
    dispatch(updateVocabEntryDB({ vocabId, updatedProperties }));
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
