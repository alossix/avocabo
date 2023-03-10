import { initialVocabProperties } from "@/store/slices/vocabSlice";
import { Vocab } from "@/types/vocab";

export const initialVocab: Vocab[] = [
  {
    emojiId: "🌞",
    definition: "the sun",
    ...initialVocabProperties,
  },
  {
    emojiId: "🌧️",
    definition: "the rain",
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F451}",
    definition: "the crown",
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F452}",
    definition: "the hat",
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F453}",
    definition: "the glasses / the sunglasses",
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F454}",
    definition: "the shirt",
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F455}",
    definition: "the t-shirt",
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F456}",
    definition: "the pants",
    ...initialVocabProperties,
  },
];
