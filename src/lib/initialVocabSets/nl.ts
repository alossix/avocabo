import { Vocab } from "@/types/vocab";
import { v4 as uuid4 } from "uuid";
import { initialVocabProperties } from "../initialVocab";

const id1 = uuid4();
const id2 = uuid4();
const id3 = uuid4();
const id4 = uuid4();
const id5 = uuid4();
const id6 = uuid4();
const id7 = uuid4();

export const exampleVocabEntryNL: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 16: 18, 19: 22 },
    category: "noun",
    definition: "de zon",
    description: "Kijk nooit naar de zon tijdens een zonsverduistering.",
    imageURL: "/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const initialVocabSetNL: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 16: 18, 19: 22 },
    category: "noun",
    definition: "de zon",
    description: "Kijk nooit naar de zon tijdens een zonsverduistering.",
    imageURL: "/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
  [id2]: {
    vocabId: id2,
    blackoutWords: { 15: 17, 18: 23 },
    category: "noun",
    definition: "de regen",
    description: "We kijken naar de regen tijdens de storm.",
    imageURL: "/images/vocabSets/rain.jpeg",
    ...initialVocabProperties,
  },
  [id3]: {
    vocabId: id3,
    blackoutWords: { 20: 25 },
    category: "noun",
    definition: "de kroon",
    description: "De acteur droeg een kroon op zijn hoofd.",
    imageURL: "/images/vocabSets/crown.jpeg",
    ...initialVocabProperties,
  },
  [id4]: {
    vocabId: id4,
    blackoutWords: { 4: 8 },
    category: "noun",
    definition: "de hoed",
    description:
      "Een hoed dragen op het strand helpt je gezicht te beschermen tegen zonneschade.",
    imageURL: "/images/vocabSets/hat.jpeg",
    ...initialVocabProperties,
  },
  [id5]: {
    vocabId: id5,
    blackoutWords: { 35: 39 },
    category: "noun",
    definition: "de bril",
    description: "Nu ik ouder ben, moet ik vaker een bril dragen om te lezen.",
    imageURL: "/images/vocabSets/glasses.jpeg",
    ...initialVocabProperties,
  },
  [id6]: {
    vocabId: id6,
    blackoutWords: { 49: 56 },
    category: "noun",
    definition: "het t-shirt",
    description:
      "Het is een warme dag, dus ik heb besloten om een T-shirt aan te trekken in plaats van een trui.",
    imageURL: "/images/vocabSets/t-shirt.jpeg",
    ...initialVocabProperties,
  },
  [id7]: {
    vocabId: id7,
    blackoutWords: { 0: 2, 3: 8 },
    category: "noun",
    definition: "de broek",
    description: "De broek was van blauw denim.",
    imageURL: "/images/vocabSets/pants.jpeg",
    ...initialVocabProperties,
  },
};
