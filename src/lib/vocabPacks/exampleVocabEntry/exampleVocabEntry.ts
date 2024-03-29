import { Vocab } from "@/types/vocab";
import { v4 as uuid4 } from "uuid";
import { initialVocabProperties } from "../../vocab";

const id1 = uuid4();

export const exampleVocabEntryCA: Record<string, Vocab> = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 13: 16 },
    category: "noun",
    definition: "el sol",
    description: "Mai miris al sol durant un eclipsi.",
    imageURL: "/images/vocabSets/exampleVocabEntry/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const exampleVocabEntryDE: Record<string, Vocab> = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 53: 59 },
    category: "noun",
    definition: "die Sonne",
    description: "Schaue niemals während einer Sonnenfinsternis in die Sonne.",
    imageURL: "/images/vocabSets/exampleVocabEntry/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const exampleVocabEntryEN: Record<string, Vocab> = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 18: 21 },
    category: "noun",
    definition: "the sun",
    description: "Never look at the sun during an eclipse.",
    imageURL: "/images/vocabSets/exampleVocabEntry/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const exampleVocabEntryES: Record<string, Vocab> = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 15: 18 },
    category: "noun",
    definition: "el sol",
    description: "Nunca mires al sol durante un eclipse.",
    imageURL: "/images/vocabSets/exampleVocabEntry/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const exampleVocabEntryFR: Record<string, Vocab> = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 19: 21, 22: 28 },
    category: "noun",
    definition: "le soleil",
    description: "Ne regardez jamais le soleil pendant une éclipse.",
    imageURL: "/images/vocabSets/exampleVocabEntry/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const exampleVocabEntryIT: Record<string, Vocab> = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 17: 19, 20: 24 },
    category: "noun",
    definition: "il sole",
    description: "Non guardare mai il sole durante un'eclissi.",
    imageURL: "/images/vocabSets/exampleVocabEntry/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const exampleVocabEntryNL: Record<string, Vocab> = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 16: 18, 19: 22 },
    category: "noun",
    definition: "de zon",
    description: "Kijk nooit naar de zon tijdens een zonsverduistering.",
    imageURL: "/images/vocabSets/exampleVocabEntry/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const exampleVocabEntryUK: Record<string, Vocab> = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 22: 27 },
    category: "noun",
    definition: "сонце",
    description: "Ніколи не дивіться на сонце під час сонячного затемнення.",
    imageURL: "/images/vocabSets/exampleVocabEntry/sun.jpeg",
    ...initialVocabProperties,
  },
};
