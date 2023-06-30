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

export const exampleVocabEntryIT: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 17: 19, 20: 24 },
    category: "noun",
    definition: "il sole",
    description: "Non guardare mai il sole durante un'eclissi.",
    imageURL: "/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const initialVocabSetIT: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 17: 19, 20: 24 },
    category: "noun",
    definition: "il sole",
    description: "Non guardare mai il sole durante un'eclissi.",
    imageURL: "/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
  [id2]: {
    vocabId: id2,
    blackoutWords: { 10: 12, 13: 20 },
    category: "noun",
    definition: "la pioggia",
    description: "Guardiamo la pioggia durante la tempesta.",
    imageURL: "/images/vocabSets/rain.jpeg",
    ...initialVocabProperties,
  },
  [id3]: {
    vocabId: id3,
    blackoutWords: { 23: 29 },
    category: "noun",
    definition: "la corona",
    description: "L'attore indossava una corona sulla testa.",
    imageURL: "/images/vocabSets/crown.jpeg",
    ...initialVocabProperties,
  },
  [id4]: {
    vocabId: id4,
    blackoutWords: { 13: 21 },
    category: "noun",
    definition: "il cappello",
    description:
      "Indossare un cappello in spiaggia aiuta a proteggere il viso dai danni del sole.",
    imageURL: "/images/vocabSets/hat.jpeg",
    ...initialVocabProperties,
  },
  [id5]: {
    vocabId: id5,
    blackoutWords: { 46: 49, 50: 58 },
    category: "noun",
    definition: "gli occhiali",
    description:
      "Ora che sono più vecchio, ho bisogno di usare gli occhiali per leggere più spesso.",
    imageURL: "/images/vocabSets/glasses.jpeg",
    ...initialVocabProperties,
  },
  [id6]: {
    vocabId: id6,
    blackoutWords: { 49: 58 },
    category: "noun",
    definition: "la maglietta",
    description:
      "Fa caldo oggi, quindi ho deciso di indossare una maglietta invece di un maglione.",
    imageURL: "/images/vocabSets/t-shirt.jpeg",
    ...initialVocabProperties,
  },
  [id7]: {
    vocabId: id7,
    blackoutWords: { 0: 1, 2: 11 },
    category: "noun",
    definition: "i pantaloni",
    description: "I pantaloni erano in denim blu.",
    imageURL: "/images/vocabSets/pants.jpeg",
    ...initialVocabProperties,
  },
};
