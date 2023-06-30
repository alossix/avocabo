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

export const exampleVocabEntryDE: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 15: 18, 19: 24 },
    category: "noun",
    definition: "die Sonne",
    description:
      "Betrachten Sie die Sonne während einer Sonnenfinsternis niemals.",
    imageURL: "/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
};

export const initialVocabSetDE: { [vocabId: string]: Vocab } = {
  [id1]: {
    vocabId: id1,
    blackoutWords: { 15: 18, 19: 24 },
    category: "noun",
    definition: "die Sonne",
    description:
      "Betrachten Sie die Sonne während einer Sonnenfinsternis niemals.",
    imageURL: "/images/vocabSets/sun.jpeg",
    ...initialVocabProperties,
  },
  [id2]: {
    vocabId: id2,
    blackoutWords: { 19: 24 },
    category: "noun",
    definition: "der Regen",
    description: "Wir beobachten den Regen während des Sturms.",
    imageURL: "/images/vocabSets/rain.jpeg",
    ...initialVocabProperties,
  },
  [id3]: {
    vocabId: id3,
    blackoutWords: { 27: 32 },
    category: "noun",
    definition: "die Krone",
    description: "Der Schauspieler trug eine Krone auf dem Kopf.",
    imageURL: "/images/vocabSets/crown.jpeg",
    ...initialVocabProperties,
  },
  [id4]: {
    vocabId: id4,
    blackoutWords: { 4: 7 },
    category: "noun",
    definition: "der Hut",
    description:
      "Ein Hut am Strand zu tragen hilft, Ihr Gesicht vor Sonnenschäden zu schützen.",
    imageURL: "/images/vocabSets/hat.jpeg",
    ...initialVocabProperties,
  },
  [id5]: {
    vocabId: id5,
    blackoutWords: { 59: 65 },
    category: "noun",
    definition: "die Brille",
    description:
      "Jetzt, wo ich älter bin, muss ich beim Lesen häufiger eine Brille tragen.",
    imageURL: "/images/vocabSets/glasses.jpeg",
    ...initialVocabProperties,
  },
  [id6]: {
    vocabId: id6,
    blackoutWords: { 59: 66 },
    category: "noun",
    definition: "das T-Shirt",
    description:
      "Es ist ein warmer Tag, also habe ich mich entschieden, ein T-Shirt statt eines Pullovers anzuziehen.",
    imageURL: "/images/vocabSets/t-shirt.jpeg",
    ...initialVocabProperties,
  },
  [id7]: {
    vocabId: id7,
    blackoutWords: { 0: 3, 4: 8 },
    category: "noun",
    definition: "die Hose",
    description: "Die Hose bestand aus blauem Denim.",
    imageURL: "/images/vocabSets/pants.jpeg",
    ...initialVocabProperties,
  },
};
