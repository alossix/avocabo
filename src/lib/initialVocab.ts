import { Vocab } from "@/types/vocab";
import { v4 as uuid4 } from "uuid";

const currentDate = new Date().toISOString();

type VocabEntry = [string, string, string, string, Record<number, number>];
type VocabSet = { [vocabId: string]: Vocab };

export const initialVocabProperties: Omit<
  Vocab,
  "category" | "definition" | "imageURL" | "vocabId"
> = {
  createdAt: currentDate,
  currentBox: 0,
  dueDate: currentDate,
  lastUpdatedAt: currentDate,
  phoneticPronunciation: "",
};

// can be more generic in the future
export const generateVocabSet = ({
  vocabEntries,
}: {
  vocabEntries: VocabEntry[];
}) => {
  const newVocabSet: VocabSet = {};

  for (let i = 0; i < vocabEntries.length; i++) {
    const id = uuid4();

    newVocabSet[id] = {
      vocabId: id,
      blackoutWords: vocabEntries[i][4],
      category: "noun",
      definition: vocabEntries[i][0],
      description: vocabEntries[i][1],
      imageURL: "/images/vocabSets/commonNouns/" + vocabEntries[i][2],
      ...initialVocabProperties,
      phoneticPronunciation: vocabEntries[i][3],
    };
  }

  return newVocabSet;
};
