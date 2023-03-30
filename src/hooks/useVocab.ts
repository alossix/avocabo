import {
  updateVocabCurrentBox,
  updateVocabDueDate,
} from "@/store/slices/sliceUtils/vocabUtils";
import {
  addVocabEntryDB,
  getVocabDB,
  removeVocabEntryDB,
  updateVocabEntryDB,
  updateVocabEntryInState,
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
    vocabWord,
    updatedProperties,
  }: {
    vocabWord: Vocab;
    updatedProperties: Partial<Vocab>;
  }) => {
    dispatch(
      updateVocabEntryInState({
        vocabId: vocabWord.vocabId,
        updatedProperties,
      })
    );

    dispatch(updateVocabEntryDB({ vocabWord, updatedProperties }));
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
    const updatedProperties = {
      box: updateVocabCurrentBox({
        currentBox: vocabWord.box,
        recallDifficulty,
      }),
      dueDate: updateVocabDueDate({ vocab: vocabWord, recallDifficulty }),
      lastUpdatedAt: new Date().toISOString(),
    };

    // Call updateVocabEntry to update both local state and database state
    updateVocabEntry({ vocabWord, updatedProperties });
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
