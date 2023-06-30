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

export const exampleVocabEntryCA: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 13: 16 },
    category: "noun",
    definition: "el sol",
    description: "Mai miris al sol durant un eclipsi.",
    imageURL: "/public/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const initialVocabSetCA: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 13: 16 },
    category: "noun",
    definition: "el sol",
    description: "Mai miris al sol durant un eclipsi.",
    imageURL: "/public/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
  [id2]: {
    vocabId: id2,
    blackoutWords: { 6: 8, 9: 14 },
    category: "noun",
    definition: "la pluja",
    description: "Mirem la pluja durant la tempesta.",
    imageURL: "/public/images/vocabSets/rain.jpeg",
    ...initialVocabProperties,
  },
  [id3]: {
    vocabId: id3,
    blackoutWords: { 20: 26 },
    category: "noun",
    definition: "la corona",
    description: "L'actor portava una corona al cap.",
    imageURL: "/public/images/vocabSets/crown.jpeg",
    ...initialVocabProperties,
  },
  [id4]: {
    vocabId: id4,
    blackoutWords: { 10: 16 },
    category: "noun",
    definition: "el barret",
    description:
      "Portar un barret a la platja ajuda a protegir la cara dels danys solars.",
    imageURL: "/public/images/vocabSets/hat.jpeg",
    ...initialVocabProperties,
  },
  [id5]: {
    vocabId: id5,
    blackoutWords: { 37: 40, 41: 48 },
    category: "noun",
    definition: "les ulleres",
    description:
      "Ara que sóc més gran, necessito usar les ulleres per llegir més sovint.",
    imageURL: "/public/images/vocabSets/glasses.jpeg",
    ...initialVocabProperties,
  },
  [id6]: {
    vocabId: id6,
    blackoutWords: { 48: 57 },
    category: "noun",
    definition: "la samarreta",
    description:
      "Fa calor avui, així que he decidit posar-me una samarreta en lloc d'un jersei.",
    imageURL: "/public/images/vocabSets/t-shirt.jpeg",
    ...initialVocabProperties,
  },
  [id7]: {
    vocabId: id7,
    blackoutWords: { 0: 3, 4: 13 },
    category: "noun",
    definition: "els pantalons",
    description: "Els pantalons eren de texà blau.",
    imageURL: "/public/images/vocabSets/pants.jpeg",
    ...initialVocabProperties,
  },
};
