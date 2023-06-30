import { v4 as uuid4 } from "uuid";
import { initialVocabProperties } from "../initialVocab";
import { Vocab } from "@/types/vocab";

const id1 = uuid4();
const id2 = uuid4();
const id3 = uuid4();
const id4 = uuid4();
const id5 = uuid4();
const id6 = uuid4();
const id7 = uuid4();

export const exampleVocabEntryEN: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 18: 21 },
    category: "noun",
    definition: "the sun",
    description: "Never look at the sun during an eclipse.",
    imageURL: "/public/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const initialVocabSetEN: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 18: 21 },
    category: "noun",
    definition: "the sun",
    description: "Never look at the sun during an eclipse.",
    imageURL: "/public/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
  [id2]: {
    vocabId: id2,
    blackoutWords: { 13: 17 },
    category: "noun",
    definition: "the rain",
    description: "We watch the rain during the storm.",
    imageURL: "/public/images/vocabSets/rain.jpeg",
    ...initialVocabProperties,
  },
  [id3]: {
    vocabId: id3,
    blackoutWords: { 17: 22 },
    category: "noun",
    definition: "the crown",
    description: "The actor wore a crown on his head.",
    imageURL: "/public/images/vocabSets/crown.jpeg",
    ...initialVocabProperties,
  },
  [id4]: {
    vocabId: id4,
    blackoutWords: { 10: 13 },
    category: "noun",
    definition: "the hat",
    description:
      "Wearing a hat at the beach helps protect your face from sun damage.",
    imageURL: "/public/images/vocabSets/hat.jpeg",
    ...initialVocabProperties,
  },
  [id5]: {
    vocabId: id5,
    blackoutWords: { 34: 41 },
    category: "noun",
    definition: "the glasses",
    description:
      "Now that I'm older, I need to use glasses for reading more often.",
    imageURL: "/public/images/vocabSets/glasses.jpeg",
    ...initialVocabProperties,
  },
  [id6]: {
    vocabId: id6,
    blackoutWords: { 42: 49 },
    category: "noun",
    definition: "the t-shirt",
    description:
      "It's a warm day, so I decided to put on a t-shirt instead of a sweater.",
    imageURL: "/public/images/vocabSets/t-shirt.jpeg",
    ...initialVocabProperties,
  },
  [id7]: {
    vocabId: id7,
    blackoutWords: { 4: 9 },
    category: "noun",
    definition: "the pants",
    description: "The pants were made of blue denim.",
    imageURL: "/public/images/vocabSets/pants.jpeg",
    ...initialVocabProperties,
  },
};
