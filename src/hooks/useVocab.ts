import {
  updateVocabCurrentBox,
  updateVocabDueDate,
} from "@/store/slices/sliceUtils/vocabUtils";
import {
  addVocabEntryDB,
  getVocabDB,
  removeVocabEntryDB,
  updateVocabEntryDB,
} from "@/store/slices/vocabSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { RecallDifficulty, Vocab } from "@/types/vocab";
import { useSelector } from "react-redux";

export const useVocab = () => {
  const dispatch = useAppDispatch();
  const vocab = useSelector((state: RootState) => state.vocab);

  const addVocabEntry = (newVocabWord: Vocab) => {
    dispatch(addVocabEntryDB({ newVocabWord }));
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

  const removeVocabEntry = (vocabId: string) => {
    dispatch(removeVocabEntryDB({ vocabId }));
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

  const getVocab = (userId: string) => {
    dispatch(getVocabDB({ userId }));
  };

  return {
    vocab,
    addVocabEntry,
    updateVocabEntry,
    removeVocabEntry,
    changeVocabBox,
    getVocab,
  };
};
